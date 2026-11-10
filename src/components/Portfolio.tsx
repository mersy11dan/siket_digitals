import { ArrowLeft, ArrowRight, ArrowUpRight, Moon, Pause, Play, Sun } from '@phosphor-icons/react'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { projects, type Project, type Themed } from '../data/content'
import { applyTheme, useTheme, type ThemeName } from '../theme'

type Reveal = 'static' | 'waiting' | 'shown'
type Phase = 'idle' | 'out' | 'in'
type Direction = 'next' | 'prev'

const PER_PAGE = 2
const PAGES = Math.ceil(projects.length / PER_PAGE)
const OUT_MS = 340
const IN_MS = 720
const SCROLL_WAIT_MS = 900

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function variantsOf(media: Themed): [ThemeName, string][] {
  return media.dark ? [['light', media.light], ['dark', media.dark]] : [['light', media.light]]
}

function delay(step: number) {
  return { '--d': step } as CSSProperties
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function rangeOf(page: number) {
  const first = page * PER_PAGE + 1
  const last = Math.min(projects.length, first + PER_PAGE - 1)
  return { first, last }
}

export function Portfolio() {
  const head = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const cancelScrollWait = useRef<(() => void) | null>(null)
  const [page, setPage] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [direction, setDirection] = useState<Direction>('next')
  const [paged, setPaged] = useState(false)
  const busy = useRef(false)

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout)
      cancelScrollWait.current?.()
    },
    [],
  )

  function later(ms: number, run: () => void) {
    timers.current.push(window.setTimeout(run, ms))
  }

  function flip(target: number, way: Direction) {
    setPaged(true)
    if (prefersReducedMotion()) {
      setPage(target)
      busy.current = false
      return
    }
    setDirection(way)
    setPhase('out')
    later(OUT_MS, () => {
      setPage(target)
      setPhase('in')
      later(IN_MS, () => {
        setPhase('idle')
        busy.current = false
      })
    })
  }

  function go(target: number, fromBottom: boolean) {
    if (busy.current || target === page || target < 0 || target >= PAGES) return
    busy.current = true
    const way: Direction = target > page ? 'next' : 'prev'
    const node = head.current
    if (!fromBottom || !node || node.getBoundingClientRect().top >= 0) {
      flip(target, way)
      return
    }

    const reduced = prefersReducedMotion()
    node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    if (reduced) {
      flip(target, way)
      return
    }
    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.removeEventListener('scrollend', finish)
      cancelScrollWait.current = null
      flip(target, way)
    }
    window.addEventListener('scrollend', finish)
    later(SCROLL_WAIT_MS, finish)
    cancelScrollWait.current = () => window.removeEventListener('scrollend', finish)
  }

  const { first, last } = rangeOf(page)
  const shown = projects.slice(first - 1, last)
  const pager = (place: 'top' | 'bottom') => (
    <Pager page={page} onGo={(target) => go(target, place === 'bottom')} place={place} />
  )

  return (
    <div className="portfolio">
      <div className="dateline portfolio-dateline" aria-hidden="true">
        <span>Selected work</span>
        <span>Designed and built by Siket Digitals</span>
        <span>{pad(projects.length)} projects</span>
      </div>
      <div className="portfolio-head" ref={head}>
        <div>
          <h3 className="portfolio-title">Recent work</h3>
          <p className="portfolio-lede">
            Sites we designed and built from the first sketch to launch, two at a time. Each preview is a
            recording of the live site.
          </p>
        </div>
        {PAGES > 1 ? pager('top') : null}
      </div>
      <p className="vh" aria-live="polite">
        {paged
          ? first === last
            ? `Showing project ${first} of ${projects.length}`
            : `Showing projects ${first} to ${last} of ${projects.length}`
          : ''}
      </p>
      <div className="stories" data-phase={phase} data-direction={direction}>
        {shown.map((project, position) => (
          <Story
            key={project.name}
            project={project}
            index={first - 1 + position}
            position={position}
            entrance={paged ? 'flip' : 'scroll'}
          />
        ))}
      </div>
      {PAGES > 1 ? pager('bottom') : null}
    </div>
  )
}

function Pager({ page, onGo, place }: { page: number; onGo: (target: number) => void; place: 'top' | 'bottom' }) {
  const { first, last } = rangeOf(page)
  const atStart = page === 0
  const atEnd = page === PAGES - 1

  return (
    <nav className={`pager pager-${place}`} aria-label={place === 'top' ? 'Recent work pages' : 'More recent work'}>
      <button
        type="button"
        className="pager-arrow"
        aria-label="Previous projects"
        aria-disabled={atStart}
        onClick={() => onGo(page - 1)}
      >
        <ArrowLeft size={18} weight="bold" />
      </button>
      <span className="pager-count" aria-hidden="true">
        {first === last ? pad(first) : `${pad(first)}–${pad(last)}`} <span>of {pad(projects.length)}</span>
      </span>
      <span className="pager-dots">
        {Array.from({ length: PAGES }, (_, target) => {
          const range = rangeOf(target)
          return (
            <button
              key={target}
              type="button"
              className="pager-dot"
              aria-label={
                range.first === range.last
                  ? `Show project ${range.first}`
                  : `Show projects ${range.first} to ${range.last}`
              }
              aria-current={target === page ? 'true' : undefined}
              onClick={() => onGo(target)}
            />
          )
        })}
      </span>
      <button
        type="button"
        className="pager-arrow"
        aria-label="Next projects"
        aria-disabled={atEnd}
        onClick={() => onGo(page + 1)}
      >
        <ArrowRight size={18} weight="bold" />
      </button>
    </nav>
  )
}

function Story({
  project,
  index,
  position,
  entrance,
}: {
  project: Project
  index: number
  position: number
  entrance: 'scroll' | 'flip'
}) {
  const ref = useRef<HTMLElement>(null)
  const [reveal, setReveal] = useState<Reveal>('static')
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const theme = useTheme()
  const variant: ThemeName = project.tour.dark && theme === 'dark' ? 'dark' : 'light'
  const live = inView && !paused

  useLayoutEffect(() => {
    if (entrance === 'scroll' && !prefersReducedMotion() && 'IntersectionObserver' in window) {
      setReveal('waiting')
    }
  }, [entrance])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const revealer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setReveal((current) => (current === 'waiting' ? 'shown' : current))
        revealer.disconnect()
      },
      { rootMargin: '0px 0px -18% 0px' },
    )
    const watcher = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.08 })
    revealer.observe(node)
    watcher.observe(node)
    return () => {
      revealer.disconnect()
      watcher.disconnect()
    }
  }, [])

  const style = {
    '--glow-light': project.glow.light,
    '--glow-dark': project.glow.dark,
    '--i': position,
  } as CSSProperties
  const toggleLabel = `${paused ? 'Play' : 'Pause'} the ${project.name} preview`

  return (
    <article ref={ref} className="story" data-reveal={reveal} data-live={live} style={style}>
      <div className="story-media">
        <div className="browser">
          <div className="browser-bar">
            <span className="browser-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-url">{new URL(project.url).host}</span>
            <button
              type="button"
              className="browser-toggle"
              onClick={() => setPaused((value) => !value)}
              aria-label={toggleLabel}
              title={toggleLabel}
            >
              {paused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
            </button>
          </div>
          <a
            className="browser-screen"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name} in a new tab`}
          >
            <Tour project={project} variant={variant} playing={live} />
            <span className="browser-open" aria-hidden="true">
              Visit site <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>
        </div>
        <div className="phone" aria-hidden="true">
          <div className="phone-screen">
            <ThemedImage media={project.mobile} className="phone-page" alt="" variant={variant} />
          </div>
        </div>
      </div>

      <div className="story-copy">
        <p className="story-kicker" style={delay(0)}>
          <span>No. {pad(index + 1)}</span>
          {project.kind}
        </p>
        <h4 className="story-title" style={delay(1)}>
          {project.name}
        </h4>
        <p className="story-body" style={delay(2)}>
          {project.body}
        </p>
        <ul className="story-features" style={delay(3)}>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <dl className="story-theme" style={delay(4)}>
          <div>
            <dt>Palette</dt>
            <dd className="swatches">
              {project.palette.map((color, swatch) => (
                <span
                  key={color.hex}
                  className="swatch"
                  style={{ '--swatch': color.hex, '--s': swatch } as CSSProperties}
                  title={`${color.name} ${color.hex}`}
                >
                  <span className="vh">{color.name}</span>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt>Modes</dt>
            <dd>{project.modes}</dd>
          </div>
        </dl>
        <div className="story-actions" style={delay(5)}>
          <a className="story-link" href={project.url} target="_blank" rel="noreferrer">
            Visit the live site <ArrowUpRight size={16} weight="bold" />
          </a>
          {project.tour.dark ? <ThemeFlip theme={theme} /> : null}
        </div>
      </div>

      <ul className="shots">
        {project.shots.map((shot, step) => (
          <li key={shot.title} className="shot" style={delay(step)}>
            <figure>
              <div className="shot-frame">
                <ThemedImage
                  media={shot.image}
                  className="shot-img"
                  alt={`${project.name}, ${shot.title.replace('.', '')} section`}
                  variant={variant}
                />
              </div>
              <figcaption>
                <strong>{shot.title}</strong> {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Tour({ project, variant, playing }: { project: Project; variant: ThemeName; playing: boolean }) {
  const videos = useRef<Partial<Record<ThemeName, HTMLVideoElement | null>>>({})
  const shown = useRef<ThemeName>(variant)

  useEffect(() => {
    const next = videos.current[variant]
    const previous = videos.current[shown.current]
    if (next && previous && next !== previous && previous.currentTime > 0) {
      next.currentTime = previous.currentTime
    }
    shown.current = variant

    for (const [name, video] of Object.entries(videos.current)) {
      if (!video) continue
      if (name === variant && playing) video.play().catch(() => {})
      else video.pause()
    }
  }, [variant, playing])

  return (
    <>
      {variantsOf(project.tour).map(([name, src]) => (
        <video
          key={name}
          ref={(node) => {
            videos.current[name] = node
          }}
          className={project.tour.dark ? `browser-video tv-${name}` : 'browser-video'}
          src={src}
          poster={project.poster[name] ?? project.poster.light}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ))}
    </>
  )
}

function ThemedImage({
  media,
  className,
  alt,
  variant,
}: {
  media: Themed
  className: string
  alt: string
  variant: ThemeName
}) {
  return (
    <>
      {variantsOf(media).map(([name, src]) => (
        <img
          key={name}
          className={media.dark ? `${className} tv-${name}` : className}
          src={src}
          alt={name === variant ? alt : ''}
          aria-hidden={name === variant ? undefined : true}
          loading="lazy"
          decoding="async"
        />
      ))}
    </>
  )
}

function ThemeFlip({ theme }: { theme: ThemeName }) {
  const next: ThemeName = theme === 'dark' ? 'light' : 'dark'

  return (
    <button type="button" className="story-flip" onClick={() => applyTheme(next)}>
      {next === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
      See its {next} mode
    </button>
  )
}
