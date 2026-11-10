"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "cn"

export function CopyCommand({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable (e.g. insecure context); ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white/80 transition-colors hover:border-[#27AAE1]/40 hover:bg-white/[0.06]",
        className
      )}
    >
      <code className="truncate text-left">{command}</code>
      {copied ? (
        <CheckIcon className="size-4 shrink-0 text-[#27AAE1]" />
      ) : (
        <CopyIcon className="size-4 shrink-0 text-white/40 group-hover:text-white/80" />
      )}
    </button>
  )
}
