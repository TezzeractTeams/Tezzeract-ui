# Tezzeract UI

A shadcn-compatible component registry for Tezzeract's actual brand
components - not a clone of shadcn's generic primitives. Each app pulls the
real component source it needs via the `shadcn` CLI, same experience as
installing shadcn's own components, but shipping Tezzeract's design system
instead.

Stack: Next.js 16 (App Router) + React 19 + Tailwind v4.

## What's in here

The 14 components currently ported are sourced directly from
[`tezzeract-temp`](../tezzeract-temp) - the real production marketing site -
so this registry matches what's actually in use, not generic shadcn
boilerplate:

- `TezzeractButton`, `TezzeractButtonLight` - branded gradient buttons
- `TezzeractH1`, `TezzeractText` - branded gradient heading/body text
- `Tooltip` (`TestimonialTooltip`) - animated avatar tooltip (motion-based)
- `PortfolioCard`, `BlogCard`, `TalentCard`, `UserCard` - content cards
  (`BlogCard` depends on `UserCard`)
- `ServiceSlider`, `ServiceItem` - infinite-scroll service list
  (`ServiceSlider` depends on `ServiceItem`)
- `Globle` - interactive globe (`cobe` + `lenis` + `motion`); depends on
  `lib/pinned-scroll-context.tsx`, a tiny app-agnostic port of
  `tezzeract-temp`'s `PinnedScrollContext`
- `clipath` - clip-path SVG utility
- `world-map` - animated world map (`dotted-map` + `motion`)

Filenames intentionally keep the original PascalCase from `tezzeract-temp`
(e.g. `TezzeractButton.tsx`), since these aren't meant to mimic shadcn's
generic kebab-case primitives.

Other structural pieces:
- `registry.json` - the registry index (generated, see below).
- `public/r/*.json` - the per-component JSON files served over HTTP, built
  from `registry.json` via `npx shadcn build`.
- `app/` - a simple docs/preview site listing every component with a live
  example (where practical) and a copyable install command.
- `scripts/generate-registry.mjs` - regenerates `registry.json` from the
  current contents of `components/ui`, `hooks`, and the lib helpers listed
  in its `libItems` map, inferring npm dependencies (pinned to the version
  in this app's own `package.json`) and cross-component
  `registryDependencies` from each file's imports.

## Known caveats

- `TezzeractH1` references `var(--font-manrope)`, which isn't defined in
  this app's own `globals.css` (it falls back to sans-serif here). Apps that
  already load the Manrope font (like `tezzeract-temp`) will render it
  correctly once installed.
- A few previews on the docs site reference placeholder/missing image
  assets (e.g. `Tooltip`'s avatar SVGs, `ServiceItem`'s arrow icon) - that
  only affects what you see on this preview site, not the installed
  component.
- `Globle` isn't rendered as a live preview on the docs site (it needs a
  canvas + scroll container that doesn't make sense to fake here), but it's
  fully in the registry and installable.

## Adding or updating a component

1. Add/edit the component file under `components/ui/` (or `hooks/`, or a
   lib helper referenced via `libItems` in the generator script).
2. If the component imports an npm package that isn't already recognized,
   add it to `npmPackageBySpecifier` in `scripts/generate-registry.mjs`
   and make sure the exact version you tested against is in this app's own
   `package.json` - the generator pins to that version automatically so
   consuming apps don't silently pick up a newer, possibly breaking release.
3. Regenerate the registry and rebuild the public JSON files:
   ```bash
   node scripts/generate-registry.mjs
   npx shadcn build
   ```
4. If you want it rendered on the docs homepage, add a small example to
   `components/previews/index.tsx` (optional - components without a preview
   still show up in the list with a "no live preview" note).

## Consuming this registry from another app

Once deployed (e.g. to Vercel), every component is installable with a single
command, same as shadcn's own components:

```bash
npx shadcn@latest add https://ui.tezzeract.com/r/TezzeractButton.json
```

To install everything at once, use the umbrella `tezzeract-ui` item. Because
it depends on every other item by name, you need to register this registry
under a namespace in the consuming app's `components.json` first, so those
cross-item dependencies resolve against this registry instead of the public
shadcn one:

```json
{
  "registries": {
    "@tezzeract": "https://ui.tezzeract.com/r/{name}.json"
  }
}
```

Then:

```bash
npx shadcn@latest add @tezzeract/tezzeract-ui     # installs all components
npx shadcn@latest add @tezzeract/TezzeractButton  # installs just one
```

Installed files are plain source copied into the consuming app - edit them
freely per app. To pull in a newer version later, re-run the same command
with `--overwrite`.

## Local development

```bash
npm run dev
```

The docs site runs at `http://localhost:3000` and the registry files are
served at `http://localhost:3000/r/<name>.json` - useful for testing installs
into another local project before deploying.
