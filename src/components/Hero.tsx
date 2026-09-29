import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { FlatLogo } from './FlatLogo'
import { WebGLBoundary } from './WebGLBoundary'

const LogoScene = lazy(() => import('./LogoScene'))

export function Hero() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(true)
  const visual = useRef<HTMLDivElement>(null)
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const node = visual.current
    if (!node || reduce) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  return (
    <section className="hero">
      <div className="wrap dateline" aria-hidden="true">
        <span>Addis Ababa</span>
        <span>Est. 2026</span>
        <span>Websites and web apps</span>
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            Modern websites for <span className="spark">growing</span> businesses.
          </h1>
          <p className="lede">
            We build responsive, high-quality websites with clean design, shaped around each business.
          </p>
          <a className="btn" href="#contact">
            Start a project
          </a>
        </div>
        <div className="hero-visual" ref={visual} role="img" aria-label="Siket Digitals logo">
          <div className={ready && !reduce ? 'visual-layer is-hidden' : 'visual-layer'}>
            <FlatLogo className="flat-logo" />
          </div>
          {reduce ? null : (
            <WebGLBoundary fallback={null}>
              <Suspense fallback={null}>
                <div className={ready ? 'visual-layer' : 'visual-layer is-hidden'}>
                  <LogoScene onReady={onReady} active={active} />
                </div>
              </Suspense>
            </WebGLBoundary>
          )}
        </div>
      </div>
    </section>
  )
}
