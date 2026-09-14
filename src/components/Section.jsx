/**
 * Shared shell. Vertical rhythm is deliberately uneven across the page;
 * uniform py-24 on every section is what made it feel flat.
 */
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative z-[2] px-6 sm:px-10 ${className}`}>
      <div className="mx-auto max-w-shell">{children}</div>
    </section>
  )
}
