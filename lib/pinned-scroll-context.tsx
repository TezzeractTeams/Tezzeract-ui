"use client"

import { createContext, useContext } from "react"

export interface PinnedScrollContextValue {
  isPinnedRef: React.MutableRefObject<boolean>
}

export const PinnedScrollContext = createContext<PinnedScrollContextValue | null>(null)

export function usePinnedScroll() {
  return useContext(PinnedScrollContext)
}
