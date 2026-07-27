import { useLayoutEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/* Weighted, editorial-calm scroll feel: Lenis driven by the GSAP ticker so
   scrub-tied ScrollTriggers share one clock (two rAFs would micro-jitter). */
export function useSmoothScroll() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    ScrollTrigger.config({ ignoreMobileResize: true })

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      anchors: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', refresh)
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(refresh)
    })

    return () => {
      cancelAnimationFrame(raf1)
      window.removeEventListener('resize', refresh)
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])
}
