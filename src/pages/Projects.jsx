import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import WorkRow from '../components/WorkRow'
import Reveal from '../components/Reveal'

/**
 * Client work delivered at Moonshot Partners (Hyperdrive IS LTD), London.
 *
 * IMPORTANT: only public, customer-facing production URLs are linked here.
 * Everything else deliberately carries no link, and those links must not be
 * added back:
 *   - Wizard, Anytime, PwC Academy exist publicly only as staging / dev hosts
 *     (*-staging.moonshot-apps.com, *-fe-dev), which is a former employer's
 *     non-production infrastructure and does not belong on an indexed page.
 *   - Sunroof is an internal tool for a client's customer success team, so its
 *     URL is not ours to publish either.
 */
const clientWork = [
  {
    name: 'Schools Out',
    blurb:
      "A platform for parents to find and book kids' camps, save favourites, build a calendar and subscribe to school alerts. Built end to end, with Stripe subscriptions, Twilio SMS and background workers for scheduled notifications.",
    role: 'Software Engineer I',
    stack: 'Ruby on Rails · Hotwire · Stripe · Twilio · RSpec',
    year: '2025–26',
    link: 'https://schoolsoutapp.com/',
  },
  {
    name: 'Digitel',
    blurb:
      'A self-service portal where mobile and internet customers manage plans, track data usage and pay bills. Most of my attention went on handling user data safely: validation, authentication, sessions and input sanitisation.',
    role: 'Software Engineer I',
    stack: 'Next.js · TypeScript · Tailwind CSS · Jest',
    year: '2024',
    link: 'https://digitel.com.ve/app-digitel',
  },
  {
    name: 'Wizard',
    blurb:
      'An English learning platform for schools, with courses, exercises, games and a gamification dashboard. I built the Next.js front end, contributed to the identity service in a microservices back end, and wrote the Express BFF that joined the two.',
    role: 'Associate SE, then Software Engineer I',
    stack: 'Next.js · TypeScript · Express.js · Jest · Microservices',
    year: '2022–23',
  },
  {
    name: 'Anytime',
    blurb:
      'A sports and leisure learning platform with progress tracking and personalised content. I worked both sides of it, Ember on the front and Rails behind, and wrote the SQL behind the reporting dashboards in Metabase.',
    role: 'Associate Software Engineer',
    stack: 'Ember.js · Ruby on Rails · Metabase · SQL',
    year: '2021',
  },
  {
    name: 'Pearson English',
    blurb:
      'An English learning platform with a placement test flow and a page where learners track their progress. I built React features, set up analytics through Google Tag Manager and Amplitude, and kept the Webflow marketing site in shape.',
    role: 'Associate Software Engineer',
    stack: 'React.js · JavaScript · GTM · Amplitude · Webflow',
    year: '2021',
    link: 'https://www.english.com/',
  },
  {
    name: 'PwC Academy',
    blurb:
      'A registration and payment gateway for PwC Academy. I built the ERB views and the Rails features behind them, including authentication and the API integration that moved user data around.',
    role: 'Associate Software Engineer',
    stack: 'Ruby on Rails · ERB · REST APIs',
    year: '2020–21',
  },
  {
    name: 'Sunroof',
    blurb:
      'An internal tool letting a customer success team see, track and correct transaction data, with an admin change log. I prototyped it in Figma against the company design system, then built it in Ember.',
    role: 'Front-end Developer Intern',
    stack: 'Ember.js · JavaScript · Tailwind CSS · Figma',
    year: '2020',
  },
]

/** Coding bootcamp and self-taught projects. An appendix, not the headline. */
const sideProjects = [
  {
    name: 'JOIN',
    stack: 'React Hooks · Firebase · Firestore',
    year: '2021',
    link: 'https://join-network.firebaseapp.com/',
    repo: 'https://github.com/FiorellaChilcon/Join-network',
  },
  {
    name: 'Schedule Tweets',
    stack: 'Ruby on Rails · PostgreSQL · Twitter API',
    year: '2021',
    repo: 'https://github.com/FiorellaChilcon/scheduled-tweets',
  },
  {
    name: 'Burger Queen API',
    stack: 'Express.js · MongoDB · Docker · Jest',
    year: '2020',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-burger-queen-api',
  },
  {
    name: 'MD Links',
    stack: 'Node.js · npm',
    year: '2020',
    link: 'https://www.npmjs.com/package/markdown-links-analyzer',
    repo: 'https://github.com/FiorellaChilcon/LIM012-fe-md-links',
  },
]

export default function Projects() {
  return (
    <Section id="work" className="py-24 sm:py-28">
      <SectionHeading
        index="01"
        label="Selected work"
        aside="Moonshot Partners · 2020–2026"
        title={
          <>
            Client work,
            <br />
            <em className="italic text-ink-soft">start to finish.</em>
          </>
        }
      />

      <Reveal className="mb-14 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        <p>
          Five years at{' '}
          <a
            href="https://www.moonshot.partners/"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            Moonshot Partners
          </a>
          , a London company I worked with remotely. I started as a front-end
          intern and finished as a Software Engineer I. These are the client
          projects I delivered, most recent first.
        </p>
      </Reveal>

      <div>
        {clientWork.map((project, i) => (
          <WorkRow key={project.name} index={String(i + 1).padStart(2, '0')} {...project} />
        ))}
        <div className="rule" />
      </div>

      {/* Appendix: the learning projects that used to headline this page. */}
      <Reveal className="mt-24">
        <div className="rule flex items-baseline justify-between gap-6 pt-4">
          <span className="label">Learning projects</span>
          <span className="label hidden sm:block">Coding bootcamp and self-taught</span>
        </div>
      </Reveal>

      <div className="mt-6">
        {sideProjects.map((project, i) => (
          <WorkRow
            key={project.name}
            index={String(i + 1).padStart(2, '0')}
            compact
            {...project}
          />
        ))}
        <div className="rule" />
      </div>
    </Section>
  )
}
