import { motion } from 'framer-motion'
import { useState } from 'react'

const me = '/myself/pic_with_llama.png'
const meHover = '/myself/pic_with_llama_sticking_out_tongue.png'

const sparkles = [
  { top: '-8%',  left: '48%',  delay: 0,    size: 'text-lg',  color: 'text-amber-300' },
  { top: '10%',  right: '-8%', delay: 0.08, size: 'text-sm',  color: 'text-teal-300'  },
  { top: '45%',  right: '-10%',delay: 0.15, size: 'text-xl',  color: 'text-amber-400' },
  { bottom: '8%',right: '-5%', delay: 0.05, size: 'text-sm',  color: 'text-teal-400'  },
  { bottom: '-8%',left: '45%', delay: 0.2,  size: 'text-lg',  color: 'text-amber-300' },
  { bottom: '10%',left: '-8%', delay: 0.1,  size: 'text-sm',  color: 'text-teal-300'  },
  { top: '45%',  left: '-10%', delay: 0.18, size: 'text-xl',  color: 'text-amber-400' },
  { top: '10%',  left: '-5%',  delay: 0.03, size: 'text-sm',  color: 'text-teal-400'  },
]

export default function AboutMe() {
  const [hovered, setHovered] = useState(false)

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-16 text-white"
        >
          About{' '}
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Me
          </span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Glow — intensifies on hover */}
              <motion.div
                animate={hovered
                  ? { scale: 1.3, opacity: 0.45 }
                  : { scale: 1,   opacity: 0.2  }
                }
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-amber-400 blur-2xl"
              />

              {/* Sparkles */}
              {sparkles.map((s, i) => (
                <motion.span
                  key={i}
                  animate={hovered
                    ? { opacity: 1, scale: 1,   y: 0   }
                    : { opacity: 0, scale: 0.3, y: 4   }
                  }
                  transition={{ duration: 0.4, delay: s.delay }}
                  className={`absolute pointer-events-none select-none ${s.size} ${s.color}`}
                  style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }}
                >
                  ✦
                </motion.span>
              ))}

              {/* Flip card */}
              <div className="group relative p-1 rounded-full bg-gradient-to-br from-teal-500/40 to-amber-400/40" style={{ perspective: '800px' }}>
                <div
                  className="relative w-80 h-80 transition-transform duration-700"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={me}
                    alt="Fiorella Chilcon"
                    className="w-80 h-80 object-cover rounded-full group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                  <img
                    src={meHover}
                    alt="Fiorella Chilcon sticking out tongue"
                    className="w-80 h-80 object-cover rounded-full absolute inset-0 [transform:rotateY(180deg)] group-hover:[transform:rotateY(360deg)] transition-transform duration-700"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-medium text-white mb-6">Hola! I'm Fiorella 👋</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-4">
              I'm a passionate fullstack developer from Perú. My tech journey took off with a
              coding bootcamp, and now I'm exploring the vibrant tech scene in Australia while
              pursuing a Bachelor's in IT majoring in Cybersecurity.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-4">
              With over 5 years of experience, I'm driven to push the boundaries of design and
              technology to deliver outstanding results. I thrive on collaborating with teams and
              embracing new challenges.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              Feel free to connect with me for opportunities or collaborations!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
