// Generates registry.json from the contents of components/ui, hooks, and
// the handful of app-agnostic lib helpers components depend on.
// Run with: node scripts/generate-registry.mjs
// Then build the public JSON files with: npx shadcn build

import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const uiDir = path.join(root, "components/ui")
const hooksDir = path.join(root, "hooks")

// npm packages used by specific import specifiers (excluding "react" and
// internal "@/..." imports).
const npmPackageBySpecifier = {
  "lucide-react": "lucide-react",
  "next-themes": "next-themes",
  cn: "cn",
  cobe: "cobe",
  "lenis/react": "lenis",
  "motion/react": "motion",
  "dotted-map": "dotted-map",
}

// Pin each dependency to the exact version this app was built and tested
// against (read from our own package.json), so `shadcn add` doesn't install
// whatever is latest on npm at install time - which can introduce breaking
// API changes (e.g. cobe v2 changed its config shape vs the v0.6.x this was
// written for).
const ownPackageJson = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8")
)
const pinnedVersion = {
  ...ownPackageJson.dependencies,
  ...ownPackageJson.devDependencies,
}

function withPinnedVersion(pkgName) {
  const version = pinnedVersion[pkgName]
  return version ? `${pkgName}@${version}` : pkgName
}

// lib helpers (besides "utils") that components may depend on, keyed by
// their "@/lib/..." import specifier suffix.
const libItems = {
  utils: {
    dependencies: [withPinnedVersion("cn")],
    files: [{ path: "lib/utils.ts", type: "registry:lib" }],
  },
  "pinned-scroll-context": {
    files: [
      { path: "lib/pinned-scroll-context.tsx", type: "registry:lib" },
    ],
  },
}

// Our own registry's namespace, as configured by consumers in their
// components.json under "registries". Cross-item registryDependencies must
// be namespaced like this, otherwise the shadcn CLI resolves bare names
// against the default public registry (ui.shadcn.com) instead of ours.
const NAMESPACE = "@tezzeract"

function parseImports(source) {
  const specifiers = new Set()
  const importRegex = /from\s+["']([^"']+)["']/g
  let match
  while ((match = importRegex.exec(source))) {
    specifiers.add(match[1])
  }
  return [...specifiers]
}

function buildItem(name, filePath, relPath, type) {
  const source = fs.readFileSync(filePath, "utf8")
  const specifiers = parseImports(source)

  const registryDependencies = new Set()
  const dependencies = new Set()

  for (const specifier of specifiers) {
    if (specifier.startsWith("@/components/ui/")) {
      registryDependencies.add(
        `${NAMESPACE}/${specifier.replace("@/components/ui/", "")}`
      )
    } else if (specifier.startsWith("@/hooks/")) {
      registryDependencies.add(
        `${NAMESPACE}/${specifier.replace("@/hooks/", "")}`
      )
    } else if (specifier.startsWith("@/lib/")) {
      const libName = specifier.replace("@/lib/", "")
      if (libItems[libName]) {
        registryDependencies.add(`${NAMESPACE}/${libName}`)
      }
    } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
      // Sibling component import within components/ui, e.g. "./UserCard".
      const siblingName = specifier.replace(/^\.\.?\//, "")
      registryDependencies.add(`${NAMESPACE}/${siblingName}`)
    } else if (npmPackageBySpecifier[specifier]) {
      dependencies.add(withPinnedVersion(npmPackageBySpecifier[specifier]))
    }
  }

  return {
    name,
    type,
    ...(dependencies.size ? { dependencies: [...dependencies].sort() } : {}),
    ...(registryDependencies.size
      ? { registryDependencies: [...registryDependencies].sort() }
      : {}),
    files: [
      {
        path: relPath,
        type,
      },
    ],
  }
}

const uiFiles = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
  .sort()

const hookFiles = fs.existsSync(hooksDir)
  ? fs
      .readdirSync(hooksDir)
      .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
      .sort()
  : []

const items = []

for (const [libName, def] of Object.entries(libItems)) {
  items.push({
    name: libName,
    type: "registry:lib",
    ...def,
  })
}

for (const file of uiFiles) {
  const name = file.replace(/\.(tsx|ts)$/, "")
  items.push(
    buildItem(
      name,
      path.join(uiDir, file),
      `components/ui/${file}`,
      "registry:ui"
    )
  )
}

for (const file of hookFiles) {
  const name = file.replace(/\.(tsx|ts)$/, "")
  items.push(
    buildItem(name, path.join(hooksDir, file), `hooks/${file}`, "registry:hook")
  )
}

// Umbrella item that installs every component in one command.
items.push({
  name: "tezzeract-ui",
  type: "registry:ui",
  registryDependencies: [
    ...Object.keys(libItems).map((libName) => `${NAMESPACE}/${libName}`),
    ...uiFiles.map((f) => `${NAMESPACE}/${f.replace(/\.(tsx|ts)$/, "")}`),
  ].sort(),
})

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "tezzeract-ui",
  homepage: "https://ui.tezzeract.com",
  items,
}

fs.writeFileSync(
  path.join(root, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n"
)

console.log(`Wrote registry.json with ${items.length} items.`)
