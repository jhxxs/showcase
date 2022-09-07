module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    [
      "taro",
      {
        framework: "react",
        ts: true,
        ios: 12
      }
    ],
    "linaria/babel" // 添加到 babel-preset
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@taroify/core",
        libraryDirectory: "",
        style: true
      },
      "@taroify/core"
    ],
    [
      "import",
      {
        libraryName: "@taroify/icons",
        libraryDirectory: "",
        camel2DashComponentName: false,
        style: () => "@taroify/icons/style"
      },
      "@taroify/icons"
    ]
  ]
}
