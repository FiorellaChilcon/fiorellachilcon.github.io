import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

// Set as a typographic index rather than pills: coloured tags read as filler,
// quiet lines read as a contents page.
const groups = [
  {
    label: 'Front end',
    items: ['React.js', 'Next.js', 'Vue.js', 'Nuxt.js', 'Ember.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    label: 'Back end',
    items: ['Laravel', 'PHP', 'Ruby on Rails', 'Node.js', 'Express.js', 'Java'],
  },
  {
    label: 'Data & AI',
    items: ['Python', 'SQL', 'Jupyter Notebooks', 'Databricks', 'Azure AI Search'],
  },
  {
    label: 'Styling & UI',
    items: ['Tailwind CSS', 'Bulma', 'Storybook'],
  },
  {
    label: 'Testing',
    items: ['Playwright', 'Jest'],
  },
]

export default function Skills() {
  return (
    <Section id="stack" className="py-24 sm:py-28">
      <SectionHeading
        index="03"
        label="Stack"
        aside="What I reach for"
      />

      <div className="grid grid-cols-12 gap-x-8 gap-y-14">
        {groups.map((group, gi) => (
          <Reveal
            key={group.label}
            delay={gi * 0.08}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <div className="rule flex items-baseline justify-between pt-3">
              <span className="label">{group.label}</span>
              <span className="font-mono text-[11px] text-ink-muted">
                {String(group.items.length).padStart(2, '0')}
              </span>
            </div>

            <ul className="mt-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-4 border-b border-ink/10 py-3 last:border-b-0"
                >
                  <span className="h-px w-3 shrink-0 self-center bg-ink/25 transition-all duration-500 ease-editorial group-hover:w-6 group-hover:bg-accent" />
                  <span className="text-[15px] text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
