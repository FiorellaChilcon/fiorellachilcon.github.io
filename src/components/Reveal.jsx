import { motion } from 'framer-motion'

/**
 * One motion primitive for the whole site. Restraint is the point:
 * a short rise and a fade, one easing curve, never a spring or a scale.
 */
export default function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
