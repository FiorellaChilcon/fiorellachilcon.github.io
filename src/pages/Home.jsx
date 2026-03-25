import { motion } from 'framer-motion'
const me = '/myself/myself_with_tech_hints.png'
import github from '../assets/icons/github.svg'
import linkedin from '../assets/icons/linkedin.svg'
import email from '../assets/icons/email.svg'

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16"
    >
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-2">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-slate-400 text-lg mb-2">Hello, I'm</p>
          <h1 className="text-5xl sm:text-6xl font-semibold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              Fiorella Chilcon
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl text-slate-300 font-normal mb-6">
            Full Stack Developer
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
            Building modern, accessible web experiences with React, Next.js, TypeScript and Ruby on Rails.
          </p>
          <div className="flex items-center gap-4 justify-center md:justify-start mb-8 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors text-sm"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-slate-300 hover:text-white rounded-lg font-medium transition-colors text-sm"
            >
              Contact Me
            </a>
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://github.com/FiorellaChilcon" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src={github} alt="GitHub" className="h-5 invert opacity-50 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.linkedin.com/in/fiorella-chilcon/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src={linkedin} alt="LinkedIn" className="h-5 invert opacity-50 hover:opacity-100 transition-opacity" />
            </a>
            <a href="mailto:fiorella_chilcon@outlook.com" aria-label="Email">
              <img src={email} alt="Email" className="h-5 invert opacity-50 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-amber-400 blur-2xl opacity-20" />
            <div className="relative p-1 rounded-full bg-gradient-to-br from-teal-500/60 to-amber-400/60">
              <img
                src={me}
                alt="Fiorella Chilcon"
                className="sm:w-70 sm:h-70 w-80 h-80 rounded-full object-cover bg-[#1a1a2e]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-teal-400 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
