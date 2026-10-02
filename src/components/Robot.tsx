const codeLines = [
  { x: 30, w: 70, tone: 'teal' },
  { x: 42, w: 96, tone: 'paper' },
  { x: 54, w: 60, tone: 'orange' },
  { x: 54, w: 84, tone: 'paper' },
  { x: 42, w: 40, tone: 'teal' },
  { x: 42, w: 104, tone: 'paper' },
  { x: 54, w: 52, tone: 'orange' },
  { x: 30, w: 30, tone: 'teal' },
] as const

const glyphs = [
  { x: 236, y: 58, text: '</>', tone: 'orange' },
  { x: 384, y: 72, text: '{ }', tone: 'teal' },
  { x: 398, y: 124, text: ';', tone: 'orange' },
] as const

export function Robot() {
  return (
    <svg className="robot" viewBox="0 0 440 280" role="img" aria-label="A Siket Digitals robot writing code">
      <g className="rb-editor">
        <rect x="16" y="30" width="176" height="150" rx="10" className="rb-window" />
        <circle cx="32" cy="46" r="3.5" className="rb-fill-orange" />
        <circle cx="44" cy="46" r="3.5" className="rb-fill-teal" />
        <circle cx="56" cy="46" r="3.5" className="rb-fill-muted" />
        <line x1="16" y1="58" x2="192" y2="58" className="rb-divider" />
        {codeLines.map((line, index) => (
          <rect
            key={index}
            x={line.x}
            y={74 + index * 13}
            width={line.w}
            height="6"
            rx="3"
            className={`rb-line rb-fill-${line.tone}`}
            style={{ animationDelay: `${index * 0.55}s` }}
          />
        ))}
        <rect x="64" y="164" width="3" height="9" className="rb-cursor rb-fill-paper" />
      </g>

      {glyphs.map((glyph, index) => (
        <text
          key={glyph.text}
          x={glyph.x}
          y={glyph.y}
          className={`rb-glyph rb-fill-${glyph.tone}`}
          style={{ animationDelay: `${index * 1.4}s` }}
        >
          {glyph.text}
        </text>
      ))}

      <rect x="140" y="256" width="296" height="4" rx="2" className="rb-desk" />

      <g className="rb-body">
        <rect x="262" y="148" width="96" height="92" rx="18" className="rb-shell" />
        <rect x="290" y="162" width="40" height="20" rx="5" className="rb-fill-teal" />
        <circle cx="300" cy="172" r="3" className="rb-fill-paper" />
        <circle cx="310" cy="172" r="3" className="rb-fill-orange rb-pulse" />
        <circle cx="320" cy="172" r="3" className="rb-fill-paper" />
        <rect x="298" y="136" width="24" height="14" rx="4" className="rb-shell" />
      </g>

      <g className="rb-head">
        <line x1="310" y1="62" x2="310" y2="46" className="rb-stroke" />
        <circle cx="310" cy="41" r="6" className="rb-fill-orange rb-pulse" />
        <rect x="254" y="88" width="10" height="24" rx="4" className="rb-fill-teal" />
        <rect x="356" y="88" width="10" height="24" rx="4" className="rb-fill-teal" />
        <rect x="262" y="62" width="96" height="76" rx="20" className="rb-shell" />
        <rect x="274" y="78" width="72" height="42" rx="12" className="rb-visor" />
        <g className="rb-look">
          <rect x="290" y="94" width="14" height="9" rx="4.5" className="rb-eye" />
          <rect x="316" y="94" width="14" height="9" rx="4.5" className="rb-eye" />
          <rect x="303" y="110" width="14" height="2.5" rx="1.25" className="rb-mouth" />
        </g>
      </g>

      <path d="M266 170 C238 184 232 214 248 242" className="rb-arm-outline" />
      <path d="M354 170 C382 184 388 214 372 242" className="rb-arm-outline" />
      <path d="M266 170 C238 184 232 214 248 242" className="rb-arm" />
      <path d="M354 170 C382 184 388 214 372 242" className="rb-arm" />

      <rect x="250" y="186" width="120" height="62" rx="6" className="rb-laptop" />
      <text x="310" y="224" className="rb-laptop-mark">
        {'</>'}
      </text>
      <path d="M232 246 L388 246 L380 256 L240 256 Z" className="rb-laptop-base" />

      <circle cx="248" cy="244" r="10" className="rb-shell rb-hand rb-hand-left" />
      <circle cx="372" cy="244" r="10" className="rb-shell rb-hand rb-hand-right" />
    </svg>
  )
}
