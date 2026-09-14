import { useState, useEffect } from 'react'
import clsx from 'clsx'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      // At the top you're on the hero, which isn't a nav item, so clear the marker.
      if (window.scrollY < 120) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy: the nav should always say where you are.
  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Don't let the page scroll behind an open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial',
        scrolled
          ? 'border-b border-ink/15 bg-canvas/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-6 sm:px-10">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-xl text-ink">Fiorella Chilcón</span>
          <span className="label hidden transition-colors group-hover:text-accent sm:block">
            Syd
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={clsx(
                'label transition-colors duration-300 hover:text-ink',
                active === href ? 'text-accent' : 'hover:text-ink'
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <span
              className={clsx(
                'absolute left-0 block h-px w-5 bg-ink transition-all duration-300 ease-editorial',
                open ? 'top-1.5 rotate-45' : 'top-0'
              )}
            />
            <span
              className={clsx(
                'absolute left-0 block h-px bg-ink transition-all duration-300 ease-editorial',
                open ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-3.5'
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu: full-bleed, oversized type, same editorial voice. */}
      <div
        className={clsx(
          'overflow-hidden bg-canvas transition-[max-height,opacity] duration-500 ease-editorial md:hidden',
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col px-6 pb-10 pt-4">
          {links.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rule flex items-baseline gap-5 py-5 font-display text-3xl text-ink"
            >
              <span className="label">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
