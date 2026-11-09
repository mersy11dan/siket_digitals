import { ArrowUpRight, Moon, Pause, Play, Sun } from '@phosphor-icons/react'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { projects, type Project, type Themed } from '../data/content'
import { applyTheme, useTheme, type ThemeName } from '../theme'

type Reveal = 'static' | 'waiting' | 'shown'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function variantsOf(media: Themed): [ThemeName, string][] {
  return media.dark ? [['light', media.light], ['dark', media.dark]] : [['light', media.light]]
}

function delay(step: number) {
  return { '--d': step } as CSSProperties
}

export function Portfolio() {
  return (
    <div className="portfolio">
      <div className="dateline portfolio-dateline" aria-hidden="true">
        <span>Selected work</span>
        <span>Designed and built by Siket Digitals</span>
        <span>{String(projects.length).padStart(2, '0')} projects</span>
      </div>
      <h3 className="portfolio-title">Recent work</h3>
      <p className="portfolio-lede">
        Two sites we designed and built from the first sketch to launch. Each preview is a recording of the live
        site.
      </p>
      <div className="stories">
        {projects.map((project, index) => (
          <Story key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

function Story({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [reveal, setReveal] = useState<Reveal>('static')
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const theme = useTheme()
  const variant: ThemeName = project.tour.dark && theme === 'dark' ? 'dark' : 'light'
  const live = inView && !paused

  useLayoutEffect(() => {
    if (!prefersReducedMotion() && 'IntersectionObserver' in window) setReveal('waiting')
  }, [])

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

  const glow = { '--glow-light': project.glow.light, '--glow-dark': project.glow.dark } as CSSProperties
  const toggleLabel = `${paused ? 'Play' : 'Pause'} the ${project.name} preview`

  return (
    <article ref={ref} className="story" data-reveal={reveal} data-live={live} style={glow}>
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
          <span>No. {String(index + 1).padStart(2, '0')}</span>
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
