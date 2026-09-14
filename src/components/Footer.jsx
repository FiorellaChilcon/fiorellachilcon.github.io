import Section from '../components/Section'
import Reveal from './Reveal'

const elsewhere = [
  { label: 'Email', value: 'fiorella_chilcon@outlook.com', href: 'mailto:fiorella_chilcon@outlook.com' },
  { label: 'LinkedIn', value: '/in/fiorella-chilcon', href: 'https://www.linkedin.com/in/fiorella-chilcon/' },
  { label: 'GitHub', value: '@FiorellaChilcon', href: 'https://github.com/FiorellaChilcon' },
]

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-ink/15">
      <Section id="contact" className="pb-14 pt-24 sm:pt-28">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="label mb-8 flex items-baseline gap-4">
              <span>05</span>
              <span>Contact</span>
            </p>
            <h2 className="font-display text-display-sm text-ink">
              Say hello.
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-ink-soft">
              This page is just a record of what I&apos;ve built and what I work
              with. If you want to collaborate or work together, feel free to
              email me.
            </p>
          </Reveal>

          {/* Contacts as an index, with the actual handles on show. Icons hide
              information; addresses give it away. */}
          <Reveal delay={0.08} className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
            {elsewhere.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group rule flex items-baseline justify-between gap-4 py-4"
              >
                <span className="label transition-colors group-hover:text-accent">
                  {label}
                </span>
                <span className="truncate font-mono text-xs text-ink-soft transition-colors group-hover:text-ink">
                  {value} ↗
                </span>
              </a>
            ))}
            <div className="rule" />
          </Reveal>
        </div>

        <div className="rule mt-24 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-6">
          <span className="label">
            Designed &amp; built by Fiorella Chilcón in Sydney · {new Date().getFullYear()}
          </span>
          <a
            href="https://github.com/FiorellaChilcon/fiorellachilcon.github.io"
            target="_blank"
            rel="noreferrer"
            className="label transition-colors hover:text-accent"
          >
            Source for this site ↗
          </a>
        </div>
      </Section>
    </footer>
  )
}
