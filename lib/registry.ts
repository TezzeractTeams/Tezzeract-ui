import registryData from "@/registry.json"

export type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: { path: string; type: string }[]
}

export const registry = registryData as {
  name: string
  homepage: string
  items: RegistryItem[]
}

// Only the installable UI components, excluding internal lib/hook helpers
// and the "install everything" umbrella item (shown separately).
export function getComponentItems(): RegistryItem[] {
  return registry.items
    .filter((item) => item.type === "registry:ui" && item.name !== "tezzeract-ui")
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getItem(name: string): RegistryItem | undefined {
  return registry.items.find((item) => item.name === name)
}

export function installCommand(name: string, baseUrl = "https://ui.tezzeract.com") {
  return `npx shadcn@latest add ${baseUrl}/r/${name}.json`
}
