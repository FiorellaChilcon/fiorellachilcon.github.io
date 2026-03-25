import { motion } from 'framer-motion'
import github from '../assets/icons/github.svg'
import play from '../assets/icons/play.svg'

export default function ProjectCard({ picture, name, link, repo, stack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/40 transition-all duration-300 w-full sm:w-[340px]"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden bg-[#0d0d0f]">
        <img
          src={picture}
          alt={name}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-medium text-base mb-1">{name}</h3>
        <p className="text-slate-500 text-xs mb-4 leading-relaxed">{stack}</p>
        <div className="flex gap-4">
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <img src={github} alt="GitHub" className="h-3.5 invert opacity-60" />
            Code
          </a>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 text-xs transition-colors"
          >
            <img src={play} alt="Demo" className="h-3.5 invert opacity-60" />
            Live Demo
          </a>
        </div>
      </div>

      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-500/0 group-hover:ring-teal-500/20 transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}
