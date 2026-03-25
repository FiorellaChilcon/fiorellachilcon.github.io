import github from '../assets/icons/github.svg'
import linkedin from '../assets/icons/linkedin.svg'
import email from '../assets/icons/email.svg'

export default function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Get in{' '}
          <span className="bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <p className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Open to new opportunities, collaborations, or just a good conversation!
        </p>

        <a
          href="mailto:fiorella_chilcon@outlook.com"
          className="inline-block px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors mb-10 text-sm"
        >
          Say Hello
        </a>

        <div className="flex justify-center gap-6 mb-10">
          <a href="https://github.com/FiorellaChilcon" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img src={github} alt="GitHub" className="h-5 invert opacity-40 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://www.linkedin.com/in/fiorella-chilcon/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <img src={linkedin} alt="LinkedIn" className="h-5 invert opacity-40 hover:opacity-100 transition-opacity" />
          </a>
          <a href="mailto:fiorella_chilcon@outlook.com" aria-label="Email">
            <img src={email} alt="Email" className="h-5 invert opacity-40 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <p className="text-slate-600 text-xs">
          Designed & built by Fiorella Chilcon · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
