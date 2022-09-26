const path = require("path")
const MDX_LAYOUT_LOADER = "mdx-layout-loader"

module.exports =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const extension = pluginOptions.extension || /\.mdx$/

    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        config.module.rules.push({
          test: extension,
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve("@mdx-js/loader"),
              options: {
                providerImportSource: "@mdx-js/react",
                ...pluginOptions.options,
              },
            },
            {
              // we need it before the other loaders, so we add it at the end
              loader: path.resolve(__dirname, MDX_LAYOUT_LOADER + ".js"),
              options: {
                layout: Object.assign(
                  {
                    // defaults
                    module: "@components/PageLayout",
                    component: "PageLayout",
                    frontMatterProp: "frontMatter",
                  },
                  pluginOptions.layout || {}
                ),
              },
            },
          ],
        })

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options)
        }

        return config
      },
    })
  }
