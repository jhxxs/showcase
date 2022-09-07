import { IPluginContext } from "@tarojs/service"
import fs from "fs"
import path from "path"

/**
 *  统计页面使用的`echarts-taro3-react`里的`echarts.js`文件会导致报错，目前通过修改该文件来修复报错
 * @see [issue](https://github.com/Cecilxx/echarts-taro3-react/issues/34, 'r.addEventListener is not a function #34')
 */
export default (ctx: IPluginContext) => {
  // 接下来使用 ctx 的时候就能获得智能提示了
  ctx.onBuildStart(() => {
    /** 自己从echarts官网自定义构建的包 */
    const customBuildEchartsPath = path.join(
      ctx.paths.sourcePath,
      "/utils/echarts.min.js"
    )
    const text = fs.readFileSync(customBuildEchartsPath).toString()

    // 修复可能出现的报错
    const str = text.replace(
      /(EventListener)\((\w{1}),(\w{1}),(\w{1})\)/g,
      (...args) => {
        const [, f, a, b, c] = args
        return `${f}?.(${a},${b},${c})`
      }
    )
    // 覆盖node_module使用的包
    fs.writeFileSync(customBuildEchartsPath, str)
  })
}
