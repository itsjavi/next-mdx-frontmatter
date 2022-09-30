# next-mdx-frontmatter

**Next.js + MDX + FrontMatter + Layouts**!

Custom [@next/mdx](https://nextjs.org/docs/advanced-features/using-mdx) plugin 
with [FrontMatter](https://frontmatter.codes/) metadata and layout component support.

Supports NextJS 12 and MDX 2.0


## Usage

```bash
npm i itsjavi/next-mdx-frontmatter

# or

yarn add itsjavi/next-mdx-frontmatter
```


```js
// next-config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "mdx"]
}

const withFrontMatterMDX = require("./plugins/next-frontmatter-mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    // these options directly gets passed to `@mdx-js/loader`
    remarkPlugins: [],
    rehypePlugins: [],
  },
  layout: {
    // example
    module: "@components/layouts/MatterPage",
    component: "MatterPage",
    frontMatterProp: "metadata",
  },
})

module.exports = withFrontMatterMDX(nextConfig)

```

With this setup, you only need to add your pages as `.mdx` files under your `/pages` directory and it is highly flexible thanks
to the FrontMatter metadata passed to the layout. For example, you can load special styles depending on the content type of your page.

Example layout:

```tsx
// ./components/layouts/MatterPage.tsx

import React from "react"
import MainContent from "./MainContent"
import MainLayout from "./MainLayout"
import { PageMetadata } from "./ContentTypes"

export const MatterPage = (
  { meta, children }: { meta: Partial<PageMetadata>; children: React.ReactNode }
) => {
  // if meta.contentType == "post", you could return another different layout here.
  return (
    <MainLayout>
      <MainContent spacing="simple">
        <article className="prose lg:prose-xl">
          <h2>{meta.title}</h2>
          {children}
        </article>
      </MainContent>
    </MainLayout>
  )
}

```
