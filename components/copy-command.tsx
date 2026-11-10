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
        "group flex w-full items-center justify-between gap-3 rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm hover:bg-muted/70 transition-colors",
        className
      )}
    >
      <code className="truncate text-left">{command}</code>
      {copied ? (
        <CheckIcon className="size-4 shrink-0 text-foreground" />
      ) : (
        <CopyIcon className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
      )}
    </button>
  )
}
