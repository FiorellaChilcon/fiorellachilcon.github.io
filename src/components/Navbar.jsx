import { useState, useEffect } from 'react'
import clsx from 'clsx'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0d0d0f]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="text-lg font-semibold">
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Fiorella
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-slate-400 hover:text-white transition-colors text-sm font-normal"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={clsx('block w-5 h-0.5 bg-white transition-all duration-300 origin-center', open && 'rotate-45 translate-y-2')} />
          <span className={clsx('block w-5 h-0.5 bg-white transition-all duration-300', open && 'opacity-0')} />
          <span className={clsx('block w-5 h-0.5 bg-white transition-all duration-300 origin-center', open && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-300 bg-[#13131f] border-b border-white/10',
          open ? 'max-h-64' : 'max-h-0'
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-base transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
