import { motion } from 'framer-motion'

const frontEnd = ['Next.js', 'Nuxt.js', 'Vue.js', 'React.js', 'Ember.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bulma', 'Storybook']
const backEnd = ['Express.js', 'Node.js', 'SQL', 'Java', 'Ruby on Rails']

function Tag({ name, variant = 'violet', index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`px-4 py-2 rounded-full text-sm border cursor-default transition-colors ${
        variant === 'violet'
          ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/50'
          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50'
      }`}
    >
      {name}
    </motion.span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-16 text-white"
        >
          Tech{' '}
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Stack
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg text-slate-300 font-medium mb-2">Frontend</h3>
            <p className="text-slate-500 text-sm mb-6">Building user interfaces and experiences</p>
            <div className="flex flex-wrap gap-3">
              {frontEnd.map((skill, i) => (
                <Tag key={skill} name={skill} variant="violet" index={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg text-slate-300 font-medium mb-2">Backend</h3>
            <p className="text-slate-500 text-sm mb-6">APIs, databases, and server-side logic</p>
            <div className="flex flex-wrap gap-3">
              {backEnd.map((skill, i) => (
                <Tag key={skill} name={skill} variant="cyan" index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
