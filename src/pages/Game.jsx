import { useEffect, useRef } from 'react'
import Section from '../components/Section'
import Phaser from 'phaser'

const GAME_H     = 230
const GROUND_Y   = 190    // feet-level Y
const GRAVITY    = 1200   // px/s²
const JUMP_VEL   = -450   // px/s  (negative = up)
const INIT_SPEED = 200    // px/s

class RunnerScene extends Phaser.Scene {
  constructor() { super({ key: 'Runner' }) }

  preload() {
    this.load.image('llama',     '/llama_game/lama.png')
    this.load.image('llamaDead', '/llama_game/llama_with_tongue_out.png')
  }

  create() {
    const W = this.scale.width

    // Ground line
    this.add.graphics()
      .lineStyle(1, 0xd3cfc5, 1)
      .lineBetween(0, GROUND_Y, W, GROUND_Y)

    // Pre-generate obstacle textures (once, reused every spawn)
    const makeTexture = (key, w, h, color) => {
      const g = this.make.graphics({ add: false })
      g.fillStyle(color)
      g.fillRoundedRect(0, 0, w, h, 4)
      g.generateTexture(key, w, h)
      g.destroy()
    }
    makeTexture('obs-tall',  12, 52, 0xa84a26)  // accent
    makeTexture('obs-short', 18, 30, 0x55524a)  // neutral

    // Llama: plain sprite, NO physics (we handle physics manually)
    this.llama    = this.add.sprite(90, GROUND_Y, 'llama')
    this.llama.setScale(0.13).setOrigin(0.5, 1)
    this.llamaVY  = 0
    this.jumping  = false

    // Score
    this.scoreVal  = 0
    this.scoreText = this.add.text(W - 12, 10, '00000', {
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: 1.5,
      fontSize: '13px',
      color: '#6e6a61',
    }).setOrigin(1, 0)

    // Game state
    this.obstacles   = []
    this.speed       = INIT_SPEED
    this.frameCount  = 0
    this.nextSpawnAt = 2000
    this.running     = false
    this.isOver      = false

    // Overlays
    const cx = W / 2, cy = GROUND_Y / 2
    this.promptText = this.add.text(cx, cy, 'PRESS SPACE OR TAP TO START', {
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: 1.5,
      fontSize: '14px',
      color: '#6e6a61',
    }).setOrigin(0.5)

    this.overlayBg = this.add.rectangle(cx, cy, W, GAME_H, 0xefece4, 0)
    this.goTitle   = this.add.text(cx, cy - 22, 'GAME OVER', {
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: 1.5,
      fontSize: '20px',
      color: '#191813',
      fontStyle: 'bold',
    }).setOrigin(0.5).setVisible(false)
    this.goScore   = this.add.text(cx, cy + 4, '', {
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: 1.5,
      fontSize: '13px',
      color: '#a84a26',
    }).setOrigin(0.5).setVisible(false)
    this.goRestart = this.add.text(cx, cy + 24, 'PRESS SPACE TO TRY AGAIN', {
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: 1.5,
      fontSize: '12px',
      color: '#6e6a61',
    }).setOrigin(0.5).setVisible(false)

    // Input: event-driven, never misses a press
    this.input.keyboard.on('keydown-SPACE', () => this.handleAction())
    this.input.on('pointerdown', () => this.handleAction())

    // Idle bob
    this.startBobTween()
  }

  handleAction() {
    if (this.isOver)              { this.scene.restart(); return }
    if (!this.running)            { this.beginGame();     return }
    if (this.running && !this.jumping) this.doJump()
  }

  beginGame() {
    this.running = true
    this.promptText.setVisible(false)
  }

  doJump() {
    this.jumping = true
    this.llamaVY  = JUMP_VEL
    this.tweens.killTweensOf(this.llama)   // stop bob
  }

  land() {
    this.jumping  = false
    this.llamaVY  = 0
    this.llama.y  = GROUND_Y
    this.startBobTween()
  }

  startBobTween() {
    this.tweens.killTweensOf(this.llama)
    this.tweens.add({
      targets:  this.llama,
      y:        GROUND_Y - 5,
      duration: 220,
      yoyo:     true,
      repeat:   -1,
      ease:     'Sine.easeInOut',
    })
  }

  spawnObstacle() {
    const W    = this.scale.width
    const tall = Math.random() > 0.45
    const key  = tall ? 'obs-tall' : 'obs-short'
    const w    = tall ? 12 : 18
    const h    = tall ? 52 : 30
    const img  = this.add.image(W + w / 2, GROUND_Y - h / 2, key)
    img._w = w
    img._h = h
    this.obstacles.push(img)
  }

  checkCollisions() {
    const L   = this.llama
    const lx1 = L.x - L.displayWidth  / 2 + 12
    const lx2 = L.x + L.displayWidth  / 2 - 12
    const ly1 = L.y - L.displayHeight + 10
    const ly2 = L.y - 4

    for (const o of this.obstacles) {
      const ox1 = o.x - o._w / 2 + 3
      const ox2 = o.x + o._w / 2 - 3
      const oy1 = GROUND_Y - o._h + 3

      if (lx2 > ox1 && lx1 < ox2 && ly2 > oy1 && ly1 < GROUND_Y) {
        this.triggerGameOver()
        return
      }
    }
  }

  triggerGameOver() {
    this.running = false
    this.isOver  = true
    this.tweens.killTweensOf(this.llama)
    this.llama.setTexture('llamaDead').setY(GROUND_Y)
    this.tweens.add({ targets: this.overlayBg, alpha: 0.45, duration: 300 })
    this.goTitle.setVisible(true)
    this.goScore.setText(`Score: ${this.scoreVal}`).setVisible(true)
    this.goRestart.setVisible(true)
  }

  update(time, delta) {
    const dt = Math.min(delta / 1000, 0.05)  // cap dt to avoid huge jumps on tab re-focus

    if (!this.running) return

    // Score & speed
    this.frameCount++
    this.scoreVal  = Math.floor(this.frameCount / 7)
    this.speed     = INIT_SPEED + Math.floor(this.scoreVal / 200) * 25
    this.scoreText.setText(String(this.scoreVal).padStart(5, '0'))

    // Llama physics (only when in the air)
    if (this.jumping) {
      this.llamaVY  += GRAVITY * dt
      this.llama.y  += this.llamaVY * dt
      if (this.llama.y >= GROUND_Y) this.land()
    }

    // Move & cull obstacles
    this.obstacles = this.obstacles.filter(o => {
      o.x -= this.speed * dt
      if (o.x + o._w / 2 < 0) { o.destroy(); return false }
      return true
    })

    // Spawn
    if (time > this.nextSpawnAt) {
      this.spawnObstacle()
      this.nextSpawnAt = time + 1200 + Math.random() * 1500
    }

    this.checkCollisions()
  }
}

export default function Game() {
  const divRef  = useRef(null)
  const gameRef = useRef(null)

  useEffect(() => {
    if (gameRef.current || !divRef.current) return

    gameRef.current = new Phaser.Game({
      type:            Phaser.AUTO,
      parent:          divRef.current,
      width:           divRef.current.offsetWidth || 700,
      height:          GAME_H,
      backgroundColor: '#efece4',
      scene:           [RunnerScene],
    })

    // Window-level Space handler: works even when canvas isn't focused
    const onSpace = (e) => {
      if (e.code !== 'Space') return
      e.preventDefault()
      const scene = gameRef.current?.scene?.getScene('Runner')
      scene?.handleAction()
    }
    window.addEventListener('keydown', onSpace)

    return () => {
      window.removeEventListener('keydown', onSpace)
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <Section id="game" className="pb-24 pt-8 sm:pb-28">
      <div className="rule flex items-baseline justify-between gap-6 pt-4">
        <div className="flex items-baseline gap-4">
          <span className="label">04</span>
          <span className="label">Interlude</span>
        </div>
        <span className="label hidden sm:block">Not part of the CV</span>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-x-8 gap-y-6">
        <p className="col-span-12 max-w-md font-display text-2xl leading-snug text-ink lg:col-span-4">
          You&apos;ve scrolled this far. Here&apos;s a llama.
        </p>
        <p className="col-span-12 self-end font-mono text-xs text-ink-muted lg:col-span-4 lg:col-start-9 lg:text-right">
          <kbd className="border border-ink/20 px-1.5 py-0.5 text-ink">Space</kbd>{' '}
          or tap to jump
        </p>
      </div>

      <div
        ref={divRef}
        className="mt-10 w-full overflow-hidden border border-ink/15 bg-canvas-raised"
      />
    </Section>
  )
}
