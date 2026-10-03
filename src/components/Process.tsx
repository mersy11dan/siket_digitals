import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { steps } from '../data/content'

type Fold = 'flat' | 'folded' | 'open'
type Play = 'a' | 'b'

const UNFOLD_MS = 1500
const STAGGER_MS = 520
const REPLAY_MS = 1400

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const [fold, setFold] = useState<Fold>('flat')
  const [plays, setPlays] = useState<Record<number, Play>>({})
  const openedAt = useRef(0)
  const lastPlay = useRef<Record<number, number>>({})

  useEffect(() => {
    const node = stepsRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!node || reduce || !('IntersectionObserver' in window)) return

    setFold('folded')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.2) {
          setFold((current) => {
            if (current !== 'open') openedAt.current = performance.now()
            return 'open'
          })
        } else if (!entry.isIntersecting) {
          setFold('folded')
          setPlays({})
          lastPlay.current = {}
        }
      },
      { threshold: [0, 0.2] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function replay(index: number) {
    if (fold !== 'open') return
    const now = performance.now()
    if (now - openedAt.current < index * STAGGER_MS + UNFOLD_MS) return
    if (now - (lastPlay.current[index] ?? 0) < REPLAY_MS) return
    lastPlay.current[index] = now
    setPlays((current) => ({ ...current, [index]: current[index] === 'a' ? 'b' : 'a' }))
  }

  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2>How a project goes</h2>
        <div className="steps" ref={stepsRef} data-fold={fold}>
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="step"
              style={{ '--i': index } as CSSProperties}
              data-play={plays[index]}
              onMouseEnter={() => replay(index)}
            >
              <div className="step-sheet">
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
