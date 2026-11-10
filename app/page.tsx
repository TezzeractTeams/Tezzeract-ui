import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { getComponentItems, installCommand } from "@/lib/registry"
import { previews } from "@/components/previews"

const CATEGORIES: { label: string; items: string[] }[] = [
  {
    label: "Brand",
    items: ["TezzeractButton", "TezzeractButtonLight", "TezzeractH1", "TezzeractText"],
  },
  {
    label: "Cards",
    items: ["PortfolioCard", "BlogCard", "TalentCard", "UserCard"],
  },
  {
    label: "Interactive",
    items: ["ServiceItem", "ServiceSlider", "Tooltip"],
  },
  {
    label: "Visuals",
    items: ["Globle", "world-map", "clipath"],
  },
]

export default function Home() {
  const items = getComponentItems()
  const itemByName = new Map(items.map((item) => [item.name, item]))

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 h-[480px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(0,155,233,0.25) 0%, rgba(0,55,138,0.08) 45%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
            <span className="size-1.5 rounded-full bg-[#27AAE1]" />
            14 components, pulled straight from production
          </div>
          <h1 className="max-w-2xl text-5xl font-light leading-[1.1] tracking-tight text-transparent bg-clip-text bg-[linear-gradient(257.31deg,#FFFFFF_16.02%,#D6D6D6_49.66%,#FFFFFF_83.98%)]">
            Tezzeract&apos;s component registry
          </h1>
          <p className="mt-5 max-w-xl text-white/60">
            Install the same buttons, cards and visuals used across Tezzeract
            products - straight into your own codebase, ready to edit. No
            package to depend on, just source you own.
          </p>
          <div className="mt-8 max-w-xl">
            <CopyCommand command={installCommand("tezzeract-ui")} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-14">
        {CATEGORIES.map((category) => (
          <section key={category.label}>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/40">
              {category.label}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {category.items.map((name) => {
                const item = itemByName.get(name)
                if (!item) return null
                return (
                  <Link
                    key={name}
                    href={`/components/${name}`}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-white">
                        {name}
                      </span>
                      <ArrowUpRightIcon className="size-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                    </div>
                    {!previews[name] ? (
                      <span className="mt-2 block text-xs text-white/35">
                        No live preview
                      </span>
                    ) : null}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
