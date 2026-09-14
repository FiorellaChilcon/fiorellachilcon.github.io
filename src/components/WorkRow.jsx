import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * A work entry as an index row.
 *
 * `logo` is the client's mark, shown on a neutral plate. Every plate is the same
 * size whether or not a logo exists, so a missing one reads as a typographic
 * plate rather than as a broken image. See public/logos/README.md for the spec.
 *
 * `compact` drops the blurb and the plate for the learning-project appendix.
 */
export default function WorkRow({ index, name, blurb, role, stack, year, link, repo, logo, compact }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}
      className="group rule relative"
    >
      {/* Accent hairline that draws itself across the row on hover. */}
      <span className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />

      <div
        className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-4 ${
          compact ? 'py-6' : 'py-9 sm:py-11'
        }`}
      >
        <span className="label col-span-2 sm:col-span-1">{index}</span>

        {!compact && (
          <div className="col-span-10 sm:col-span-2">
            <div className="flex aspect-[3/2] items-center justify-center border border-ink/15 bg-canvas-raised px-4">
              {logo ? (
                <img
                  src={logo}
                  alt={`${name} logo`}
                  loading="lazy"
                  className="max-h-[52%] w-full object-contain"
                />
              ) : (
                // No mark to show: a set initial, not the name repeated from
                // the heading three centimetres to the right.
                <span className="font-display text-4xl leading-none text-ink-muted">
                  {name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className={compact ? 'col-span-10 sm:col-span-5' : 'col-span-12 sm:col-span-4'}>
          <h3
            className={`font-display leading-none text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-1 ${
              compact ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {name}
          </h3>
          {blurb && (
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{blurb}</p>
          )}
        </div>

        <div className={`col-span-12 ${compact ? 'sm:col-span-4 sm:col-start-7' : 'sm:col-span-3'}`}>
          {role && <p className="label">{role}</p>}
          <p className={`font-mono text-xs leading-relaxed text-ink-soft ${role ? 'mt-2' : ''}`}>
            {stack}
          </p>
          {(link || repo) && (
            <div className="mt-4 flex gap-8">
              {link && (
                <a href={link} target="_blank" rel="noreferrer" className="link-underline font-mono text-xs">
                  Live ↗
                </a>
              )}
              {repo && (
                <a href={repo} target="_blank" rel="noreferrer" className="link-underline font-mono text-xs">
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>

        <span className="col-span-12 font-mono text-xs text-ink-muted sm:col-span-2 sm:text-right">
          {year}
        </span>
      </div>
    </motion.article>
  )
}
