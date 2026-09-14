import { useState } from 'react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const portrait = '/myself/pic_with_llama.png'
const portraitAlt = '/myself/pic_with_llama_sticking_out_tongue.png'

export default function AboutMe() {
  const [playful, setPlayful] = useState(false)

  return (
    <Section id="about" className="py-24 sm:py-28">
      <SectionHeading
        index="02"
        label="About"
        title={
          <>
            I started with a bootcamp in Lima
            <br />
            <em className="italic text-ink-soft">and haven&apos;t stopped since.</em>
          </>
        }
      />

      <div className="grid grid-cols-12 gap-x-8 gap-y-14">
        {/* Portrait: a rectangle, captioned like a plate in a book, not a
            glowing circle. Colour and the second frame reward hovering. */}
        <Reveal className="col-span-12 sm:col-span-5 lg:col-span-3">
          <div
            className="group relative"
            onMouseEnter={() => setPlayful(true)}
            onMouseLeave={() => setPlayful(false)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-canvas-raised">
              <img
                src={portrait}
                alt="Fiorella Chilcón"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-editorial ${
                  playful ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <img
                src={portraitAlt}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-editorial ${
                  playful ? 'scale-[1.03] opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            <p className="label mt-4">Fig. 1 · Lima, with a llama</p>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className="col-span-12 space-y-5 text-[17px] leading-relaxed sm:col-span-7 lg:col-span-6 lg:col-start-6"
        >
          <p>
            I&apos;ve worked across the stack since 2020, on teams from two people
            up to twenty or so. Database, API, the interface, all of it.
          </p>
          <p>
            I&apos;m in Sydney now. I finished a Bachelor&apos;s in IT with a
            cybersecurity major in July 2026, and it changed how I build. I
            don&apos;t just want an app to look good on the outside, I want it to
            be secure underneath too.
          </p>
          <p>
            When I&apos;m not coding I&apos;m usually outside, or explaining to
            someone why there&apos;s a llama at the bottom of this page.
          </p>
        </Reveal>

      </div>
    </Section>
  )
}
