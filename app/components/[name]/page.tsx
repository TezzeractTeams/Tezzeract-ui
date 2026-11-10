import Link from "next/link"
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
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All components
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{name}</h1>

      <div className="mt-6">
        <CopyCommand command={installCommand(name)} />
      </div>

      <div className="mt-8 rounded-lg border p-8">
        {preview ?? (
          <p className="text-sm text-muted-foreground">
            No live preview available for this component yet - install it to
            see it rendered in your own app.
          </p>
        )}
      </div>

      {item.dependencies?.length ? (
        <p className="mt-6 text-sm text-muted-foreground">
          npm dependencies: {item.dependencies.join(", ")}
        </p>
      ) : null}
      {item.registryDependencies?.length ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Also installs: {item.registryDependencies.join(", ")}
        </p>
      ) : null}
    </main>
  )
}
