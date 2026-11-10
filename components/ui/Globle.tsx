"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useLenis } from "lenis/react"
import { useMotionValue, useSpring } from "motion/react"

import { usePinnedScroll } from "@/lib/pinned-scroll-context"
import { cn } from "cn"

const MOVEMENT_DAMPING = 1400
const SCROLL_TO_PHI = 0.0015
const BOOST_DECAY = 0.72

const MARKER_LOCATIONS: [number, number][] = [
  [6.9271, 79.8612],     // Sri Lanka - Colombo
  [28.6139, 77.2090],    // India - New Delhi
  [22.3193, 114.1694],   // Hong Kong
  [41.9028, 12.4964],    // Italy - Rome
  [48.8566, 2.3522],     // France - Paris
  [38.7223, -9.1393],    // Portugal - Lisbon
  [39.9612, -82.9988],   // USA - Ohio (Columbus)
  [34.0522, -118.2437],  // USA - California (Los Angeles)
  [34.7465, -92.2896],   // USA - Arkansas (Little Rock)
  [1.3521, 103.8198],    // Singapore
  [13.7563, 100.5018],   // Thailand - Bangkok
  [51.5074, -0.1278],    // United Kingdom - London
  [52.52, 13.405],       // Germany - Berlin
  [54.6872, 25.2797],    // Lithuania - Vilnius
]

const BASE_MARKER_SIZE = 0.08
const PULSE_MIN = 0.06
const PULSE_MAX = 0.12

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [39 / 255, 170 / 255, 225 / 255],
  glowColor: [1, 1, 1],
  markers: MARKER_LOCATIONS.map((location) => ({ location, size: BASE_MARKER_SIZE })),
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const scrollSpinBoost = useRef(0)
  const pinnedScroll = usePinnedScroll()
  const lenis = useLenis()

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!lenis) return
    const unsubscribe = lenis.on("scroll", (e: { velocity: number }) => {
      const shouldApplyScroll =
        pinnedScroll?.isPinnedRef.current ?? false
      if (shouldApplyScroll) {
        scrollSpinBoost.current += e.velocity * SCROLL_TO_PHI
      }
    })
    return () => unsubscribe()
  }, [lenis, pinnedScroll])

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phi += 0.003
        const boost = scrollSpinBoost.current
        phi += boost
        scrollSpinBoost.current *= BOOST_DECAY
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
        // Pulsing effect: oscillate marker size between PULSE_MIN and PULSE_MAX
        const t = performance.now() * 0.001
        const pulse = (Math.sin(t * 2) + 1) * 0.5
        const size = PULSE_MIN + pulse * (PULSE_MAX - PULSE_MIN)
        state.markers = MARKER_LOCATIONS.map((location) => ({ location, size }))
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[800px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
