import { useEffect, useRef } from 'react'
import logoUrl from '../../resource/siket_diditals_logo.png'

const BLACK_CUTOFF = 28

type FlatLogoProps = {
  className?: string
}

export function FlatLogo({ className }: FlatLogoProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const image = new Image()
    image.decoding = 'async'
    image.src = logoUrl
    let cancel = false

    image.onload = () => {
      if (cancel) return
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) return
      context.drawImage(image, 0, 0)
      const frame = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = frame.data
      for (let index = 0; index < pixels.length; index += 4) {
        if (
          pixels[index] < BLACK_CUTOFF &&
          pixels[index + 1] < BLACK_CUTOFF &&
          pixels[index + 2] < BLACK_CUTOFF
        ) {
          pixels[index + 3] = 0
        }
      }
      context.putImageData(frame, 0, 0)
      const crop = Math.floor(canvas.height * 0.64)
      const symbol = context.getImageData(0, 0, canvas.width, crop)
      canvas.height = crop
      context.putImageData(symbol, 0, 0)
    }

    return () => {
      cancel = true
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
