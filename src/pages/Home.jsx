import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ease = [0.16, 1, 0.3, 1]

// Staggered rise, one line at a time, so the hero reads instead of arriving at once.
const line = {
  hidden: { opacity: 0, y: '0.6em' },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease },
  }),
}

function SydneyClock() {
  const [now, setNow] = useState('')

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('en-AU', {
          timeZone: 'Australia/Sydney',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 15000)
    return () => clearInterval(id)
  }, [])

  return <>{now} AEST</>
}

function MetaRow({ label, children }) {
  return (
    <div className="rule flex items-baseline justify-between gap-4 py-3">
      <span className="label">{label}</span>
      <span className="font-mono text-xs text-ink">{children}</span>
    </div>
  )
}

export default function Home() {
  return (
    <section
      id="top"
      className="relative z-[2] flex min-h-svh flex-col justify-center px-6 pb-16 pt-32 sm:px-10"
    >
      <div className="mx-auto w-full max-w-shell">
        <div className="grid grid-cols-12 gap-y-14">
          {/* Headline */}
          <div className="col-span-12 lg:col-span-8">
            <motion.p
              custom={0}
              variants={line}
              initial="hidden"
              animate="show"
              className="label mb-8"
            >
              Fiorella Chilcón · Full-stack developer
            </motion.p>

            <h1 className="font-display text-display text-ink">
              {['Building web', 'software that'].map((text, i) => (
                <span key={text} className="block overflow-hidden">
                  <motion.span
                    custom={i + 1}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="block"
                  >
                    {text}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <motion.span custom={3} variants={line} initial="hidden" animate="show" className="block">
                  <em className="italic text-accent">holds up.</em>
                </motion.span>
              </span>
            </h1>

            <motion.p
              custom={5}
              variants={line}
              initial="hidden"
              animate="show"
              className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              I build with modern web technologies to bring ideas to life, from
              first concept all the way through to production. Coding since 2020.
            </motion.p>

            <motion.div
              custom={6}
              variants={line}
              initial="hidden"
              animate="show"
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <a href="#work" className="link-underline font-mono text-sm">
                See the work
              </a>
              <a href="#contact" className="link-underline font-mono text-sm">
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Meta rail: the facts, set as a colophon. */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="col-span-12 self-end lg:col-span-3 lg:col-start-10"
          >
            <MetaRow label="Based in">Sydney, AU</MetaRow>
            <MetaRow label="Local time">
              <SydneyClock />
            </MetaRow>
            <MetaRow label="From">Lima, Perú</MetaRow>
            <MetaRow label="Degree">BIT, Cybersecurity · 2026</MetaRow>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
