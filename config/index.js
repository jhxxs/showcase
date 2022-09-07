const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const pkg = require("../package.json")
const project = require("../project.config.json")
const env = process.env.TARO_ENV
const config = {
  projectName: "worth_cloud_weapp",
  alias: {
    "@": path.resolve(__dirname, "..", "src/")
  },
  date: "2021-9-30",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: `dist/${env}`,
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  plugins: [[path.resolve(__dirname, "./plugin/echarts.ts")]],
  defineConstants: {
    "process.env.API_ENV": JSON.stringify(process.env.API_ENV)
  },
  framework: "react",
  mini: {
    // debugReact: true,
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 * 2 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    },
    webpackChain(
      /** @type {import("webpack-chain")} */
      chain,
      /** @type {import("webpack")} */
      webpack
    ) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      chain.module
        .rule("script")
        .use("linariaLoader")
        .loader("linaria/loader")
        .options({
          sourceMap: false
          //  process.env.NODE_ENV !== "production"
        })
      try {
        // chain
        //   .plugin("analyzer")
        //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, [])
      } catch (error) {}
    },
    enableSourceMap: true,
    enableExtract: true,
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true
    },
    optimizeMainPackage: {
      enable: false
    }
  },
  h5: {
    esnextModules: ["@taroify"],
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {}
      }
    },
    cssModules: {
      enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      config: {
        namingPattern: "module", // 转换模式，取值为 global/module
        generateScopedName: "[name]__[local]___[hash:base64:5]"
      }
    },
    webpackChain(
      /** @type {import("webpack-chain")} */
      chain,
      webpack
    ) {
      chain.module
        .rule("script")
        .use("linariaLoader")
        .loader("linaria/loader")
        .options({
          sourceMap: false
          // process.env.NODE_ENV !== "production"
        })
    }
  },
  sass: {
    resource: ["src/styles/custom-variables.scss", "src/styles/var.scss"],
    projectDirectory: path.resolve(__dirname, "..")
  },

  csso: {
    enable: true
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"))
  }
  return merge({}, config, require("./prod"))
}
