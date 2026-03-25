import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Phaser from 'phaser'

const GAME_H     = 260
const GROUND_Y   = 205    // feet-level Y
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
      .lineStyle(1, 0x334155, 0.5)
      .lineBetween(0, GROUND_Y, W, GROUND_Y)

    // Pre-generate obstacle textures (once, reused every spawn)
    const makeTexture = (key, w, h, color) => {
      const g = this.make.graphics({ add: false })
      g.fillStyle(color)
      g.fillRoundedRect(0, 0, w, h, 4)
      g.generateTexture(key, w, h)
      g.destroy()
    }
    makeTexture('obs-tall',  12, 52, 0x0d9488)  // teal
    makeTexture('obs-short', 18, 30, 0xd97706)  // amber

    // Llama — plain sprite, NO physics (we handle physics manually)
    this.llama    = this.add.sprite(90, GROUND_Y, 'llama')
    this.llama.setScale(0.13).setOrigin(0.5, 1)
    this.llamaVY  = 0
    this.jumping  = false

    // Score
    this.scoreVal  = 0
    this.scoreText = this.add.text(W - 12, 10, '00000', {
      fontFamily: 'Kodchasan, monospace',
      fontSize: '13px',
      color: '#475569',
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
    this.promptText = this.add.text(cx, cy, 'Press  Space  or  tap  to  start', {
      fontFamily: 'Kodchasan, sans-serif',
      fontSize: '14px',
      color: '#64748b',
    }).setOrigin(0.5)

    this.overlayBg = this.add.rectangle(cx, cy, W, GAME_H, 0x000000, 0)
    this.goTitle   = this.add.text(cx, cy - 22, 'Game Over', {
      fontFamily: 'Kodchasan, sans-serif',
      fontSize: '20px',
      color: '#f1f5f9',
      fontStyle: 'bold',
    }).setOrigin(0.5).setVisible(false)
    this.goScore   = this.add.text(cx, cy + 4, '', {
      fontFamily: 'Kodchasan, sans-serif',
      fontSize: '13px',
      color: '#fbbf24',
    }).setOrigin(0.5).setVisible(false)
    this.goRestart = this.add.text(cx, cy + 24, 'Press Space to try again', {
      fontFamily: 'Kodchasan, sans-serif',
      fontSize: '12px',
      color: '#64748b',
    }).setOrigin(0.5).setVisible(false)

    // Input — event-driven, never misses a press
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
    this.tweens.add({ targets: this.overlayBg, alpha: 0.55, duration: 300 })
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
      backgroundColor: '#0a0a10',
      scene:           [RunnerScene],
    })

    // Window-level Space handler — works even when canvas isn't focused
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
    <section id="game" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-3 text-white"
        >
          Need a{' '}
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Break?
          </span>
        </motion.h2>
        <p className="text-slate-500 text-sm text-center mb-10">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 text-xs font-mono">
            Space
          </kbd>{' '}
          to jump · avoid the obstacles
        </p>
        <div
          ref={divRef}
          className="w-full rounded-2xl overflow-hidden border border-white/10"
        />
      </div>
    </section>
  )
}
