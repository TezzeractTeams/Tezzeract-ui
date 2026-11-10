import Link from "next/link"

import { CopyCommand } from "@/components/copy-command"
import { getComponentItems, installCommand } from "@/lib/registry"
import { previews } from "@/components/previews"

export default function Home() {
  const items = getComponentItems()

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 space-y-4">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          Tezzeract UI
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">
          Shared component registry
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          A shadcn-compatible registry of Tezzeract&apos;s shared UI
          components. Install everything into a new app, or pick individual
          components as you need them - the source is copied straight into
          your project, so it&apos;s yours to edit.
        </p>
        <CopyCommand command={installCommand("tezzeract-ui")} className="max-w-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.name}
            href={`/components/${item.name}`}
            className="rounded-lg border p-4 text-sm font-medium transition-colors hover:bg-muted/60"
          >
            {item.name}
            {!previews[item.name] ? (
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                No live preview
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  )
}
