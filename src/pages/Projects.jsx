import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import burgerQueen from '../assets/images/burger-queen.png'
import mdLinks from '../assets/images/md-links.png'
import scheduleTweets from '../assets/images/schedule-tweets.png'
import joinApp from '../assets/images/join-app.png'

const projects = [
  {
    picture: joinApp,
    name: 'JOIN - Social Network',
    link: 'https://join-network.firebaseapp.com/',
    repo: 'https://github.com/FiorellaChilcon/Join-network',
    stack: 'React hooks · Firebase',
  },
  {
    picture: scheduleTweets,
    name: 'Schedule Tweets',
    link: 'https://github.com/FiorellaChilcon/scheduled-tweets',
    repo: 'https://github.com/FiorellaChilcon/scheduled-tweets',
    stack: 'Ruby on Rails · PostgreSQL · Twitter API',
  },
  {
    picture: burgerQueen,
    name: 'Burger Queen - API',
    link: 'https://github.com/FiorellaChilcon/LIM012-fe-burger-queen-api',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-burger-queen-api',
    stack: 'Express.js · MongoDB · Docker',
  },
  {
    picture: mdLinks,
    name: 'MD Links - Library',
    link: 'https://www.npmjs.com/package/markdown-links-analyzer',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-md-links',
    stack: 'Node.js · NPM',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-16 text-white"
        >
          Featured{' '}
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
