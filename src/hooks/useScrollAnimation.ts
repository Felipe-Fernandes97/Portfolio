import { useEffect, type RefObject } from 'react'

export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  _animClass: string,
  threshold = 0.15
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-inview')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
}
