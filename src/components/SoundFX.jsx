import { useEffect, useRef } from 'react'

export default function SoundFX() {
  const hoverRef = useRef(null)
  const clickRef = useRef(null)

  useEffect(() => {
    hoverRef.current = new Audio('/sounds/hover.mp3')
    hoverRef.current.volume = 0.25
    clickRef.current = new Audio('/sounds/click.mp3')
    clickRef.current.volume = 0.35

    const playHover = (e) => {
      const target = e.target.closest('[data-hover]')
      if (target) {
        hoverRef.current.currentTime = 0
        hoverRef.current.play().catch(() => {})
      }
    }

    const playClick = (e) => {
      const target = e.target.closest('[data-click]')
      if (target) {
        clickRef.current.currentTime = 0
        clickRef.current.play().catch(() => {})
      }
    }

    document.addEventListener('mouseover', playHover)
    document.addEventListener('click', playClick)
    return () => {
      document.removeEventListener('mouseover', playHover)
      document.removeEventListener('click', playClick)
    }
  }, [])

  return null
}
