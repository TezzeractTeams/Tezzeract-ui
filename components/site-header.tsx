import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-[radial-gradient(64.46%_80%_at_50.53%_0%,#009BE9_0%,#00378A_100%)] text-xs font-semibold text-white">
            T
          </span>
          <span className="text-sm font-medium text-white">
            Tezzeract <span className="text-white/50">UI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/60">
          <a
            href="https://github.com/TezzeractTeams/Tezzeract-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
