import Reveal from './Reveal'

/**
 * Numbered section marker: index and label sit on a hairline rule, the way a
 * chapter opener does. Headings are left-aligned, because centering everything is what
 * made the old layout read as a template.
 */
export default function SectionHeading({ index, label, title, aside }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="rule flex items-baseline justify-between gap-6 pt-4">
        <div className="flex items-baseline gap-4">
          <span className="label text-ink-muted">{index}</span>
          <span className="label">{label}</span>
        </div>
        {aside && <span className="label hidden sm:block">{aside}</span>}
      </div>

      {title && (
        <h2 className="mt-8 max-w-3xl font-display text-display-sm text-ink">
          {title}
        </h2>
      )}
    </Reveal>
  )
}
