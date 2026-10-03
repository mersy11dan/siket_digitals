import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { steps } from '../data/content'

type Fold = 'flat' | 'folded' | 'open'

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const [fold, setFold] = useState<Fold>('flat')

  useEffect(() => {
    const node = stepsRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!node || reduce || !('IntersectionObserver' in window)) return

    setFold('folded')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setFold('open')
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2>How a project goes</h2>
        <div className="steps" ref={stepsRef} data-fold={fold}>
          {steps.map((step, index) => (
            <article key={step.title} className="step" style={{ '--i': index } as CSSProperties}>
              <span className="step-num">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
