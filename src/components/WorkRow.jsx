import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * A work entry as an index row. The artwork sits at a fixed spot in the layout:
 * small, contained, always there. An earlier version floated it next to the
 * cursor, which read as a rendering bug rather than a feature.
 *
 * These assets are project logos, not screenshots, so they're framed as marks
 * (contained, padded, square) rather than cropped like captures would be.
 */
export default function WorkRow({ index, name, blurb, role, stack, year, link, repo, picture }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease }}
      className="group rule relative"
    >
      {/* Accent hairline that draws itself across the row on hover. */}
      <span className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />

      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-6 py-10 sm:py-12">
        <span className="label col-span-12 sm:col-span-1 sm:pt-1">{index}</span>

        <div className="col-span-6 sm:col-span-2">
          <div className="flex aspect-square items-center justify-center border border-ink/15 bg-canvas-raised p-5">
            <img
              src={picture}
              alt={`${name} logo`}
              loading="lazy"
              className="max-h-full w-full object-contain transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.06]"
            />
          </div>
        </div>

        <div className="col-span-12 sm:col-span-5">
          <h3 className="font-display text-3xl leading-none text-ink sm:text-4xl">
            {name}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{blurb}</p>
        </div>

        <div className="col-span-12 sm:col-span-3">
          <p className="label">{role}</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-ink-soft">{stack}</p>
          <div className="mt-5 flex gap-8">
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
        </div>

        <span className="col-span-6 font-mono text-xs text-ink-muted sm:col-span-1 sm:pt-1 sm:text-right">
          {year}
        </span>
      </div>
    </motion.article>
  )
}
