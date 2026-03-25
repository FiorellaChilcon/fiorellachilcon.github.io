import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Footer from './components/Footer'

const Game = lazy(() => import('./pages/Game'))

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />
      <main>
        <Home />
        <AboutMe />
        <Projects />
        <Skills />
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
