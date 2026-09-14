import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import WorkRow from '../components/WorkRow'
import burgerQueen from '../assets/images/burger-queen.png'
import mdLinks from '../assets/images/md-links.png'
import scheduleTweets from '../assets/images/schedule-tweets.png'
import joinApp from '../assets/images/join-app.png'

const projects = [
  {
    picture: joinApp,
    name: 'JOIN',
    blurb:
      'A social network with auth, a live post feed, likes and image uploads, built on Firestore listeners so the timeline updates without a refresh.',
    role: 'Design & build, solo',
    stack: 'React Hooks · Firebase · Firestore',
    year: '2021',
    link: 'https://join-network.firebaseapp.com/',
    repo: 'https://github.com/FiorellaChilcon/Join-network',
  },
  {
    picture: scheduleTweets,
    name: 'Schedule Tweets',
    blurb:
      'Queue a tweet now, publish it later. Handles the Twitter OAuth handshake, stores the queue in Postgres and dispatches on a cron worker.',
    role: 'Design & build, solo',
    stack: 'Ruby on Rails · PostgreSQL · Twitter API',
    year: '2021',
    link: 'https://github.com/FiorellaChilcon/scheduled-tweets',
    repo: 'https://github.com/FiorellaChilcon/scheduled-tweets',
  },
  {
    picture: burgerQueen,
    name: 'Burger Queen API',
    blurb:
      'REST API for a restaurant ordering system: role-based auth, menu and order resources, containerised with Docker and covered by an integration suite.',
    role: 'Backend, paired',
    stack: 'Express.js · MongoDB · Docker · Jest',
    year: '2020',
    link: 'https://github.com/FiorellaChilcon/LIM012-fe-burger-queen-api',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-burger-queen-api',
  },
  {
    picture: mdLinks,
    name: 'MD Links',
    blurb:
      'A Node library and CLI that walks Markdown files, extracts every link and reports which ones are dead. Published to npm as markdown-links-analyzer.',
    role: 'Author, solo',
    stack: 'Node.js · npm · Commander',
    year: '2020',
    link: 'https://www.npmjs.com/package/markdown-links-analyzer',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-md-links',
  },
]

const years = [...new Set(projects.map((p) => p.year))].sort()

export default function Projects() {
  return (
    <Section id="work" className="py-24 sm:py-28">
      <SectionHeading
        index="01"
        label="Selected work"
        aside={`${years[0]}–${years[years.length - 1]}`}
        title={
          <>
            Four things I built,
            <br />
            <em className="italic text-ink-soft">start to finish.</em>
          </>
        }
      />

      <div>
        {projects.map((project, i) => (
          <WorkRow
            key={project.name}
            index={String(i + 1).padStart(2, '0')}
            {...project}
          />
        ))}
        <div className="rule" />
      </div>
    </Section>
  )
}
