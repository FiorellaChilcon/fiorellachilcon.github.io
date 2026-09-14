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
    <div className="grain min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Home />
        <Projects />
        <AboutMe />
        <Skills />
        <Suspense fallback={<div className="h-64" />}>
          <Game />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
