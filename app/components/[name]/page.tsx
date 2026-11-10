import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { notFound } from "next/navigation"

import { CopyCommand } from "@/components/copy-command"
import { previews } from "@/components/previews"
import { getComponentItems, getItem, installCommand } from "@/lib/registry"

export function generateStaticParams() {
  return getComponentItems().map((item) => ({ name: item.name }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getItem(name)

  if (!item || item.type !== "registry:ui") {
    notFound()
  }

  const preview = previews[name]

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeftIcon className="size-3.5" />
        All components
      </Link>

      <h1 className="mt-5 font-mono text-3xl font-medium tracking-tight text-white">
        {name}
      </h1>

      <div className="mt-6">
        <CopyCommand command={installCommand(name)} />
      </div>

      <div
        className="mt-8 overflow-hidden rounded-xl border border-white/10 p-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "20px 20px",
          backgroundColor: "#07090f",
        }}
      >
        <div className="flex min-h-[8rem] items-center justify-center">
          {preview ?? (
            <p className="max-w-sm text-center text-sm text-white/40">
              No live preview available for this component yet - install it
              to see it rendered in your own app.
            </p>
          )}
        </div>
      </div>

      {item.dependencies?.length ? (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-white/30">
            Dependencies
          </span>
          {item.dependencies.map((dep) => (
            <code
              key={dep}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70"
            >
              {dep}
            </code>
          ))}
        </div>
      ) : null}
      {item.registryDependencies?.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-white/30">
            Also installs
          </span>
          {item.registryDependencies.map((dep) => (
            <code
              key={dep}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70"
            >
              {dep.replace("@tezzeract/", "")}
            </code>
          ))}
        </div>
      ) : null}
    </main>
  )
}
