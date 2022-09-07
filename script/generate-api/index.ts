import { generateApi } from "swagger-typescript-api"
import path from "path"
// import fs from "fs"

const outputPath = path.resolve(process.cwd(), "./src/service/server")
/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */

/** 通用接口生成文件
 * @param fileName 要生成的文件名称
 * @param jsonUrl swager json链接
 */
export const commonGenerateApi = (fileName: string, jsonUrl: string) =>
  generateApi({
    name: fileName,
    output: outputPath,
    url: jsonUrl,
    templates: path.resolve(
      process.cwd(),
      /**
       * @see [`axios-http-client.eta`](https://github.com/acacode/swagger-typescript-api/blob/next/templates/base/http-clients/axios-http-client.eta)
       */
      "./script/generate-api/templates"
    ),
    httpClientType: "axios", // or "fetch"
    defaultResponseAsSuccess: false,
    generateRouteTypes: true,
    generateResponses: true,
    toJS: false,
    extractRequestParams: false,
    prettier: {
      printWidth: 120,
      tabWidth: 2,
      trailingComma: "all",
      parser: "typescript"
    },
    defaultResponseType: false,
    singleHttpClient: false,
    cleanOutput: false,
    enumNamesAsValues: false,
    moduleNameFirstTag: false,
    generateUnionEnums: false,
    extraTemplates: [],
    hooks: {}
  }).catch((e) => console.error(e))

const apiList: {
  name: string
  json: string
  desc: string
}[] = [
  {
    desc: "接口文件",
    name: "api.ts",
    json: "http://localhost:8080"
  }
]

console.log(
  "%c ------根据swagger json更新接口请求文件--------",
  "color: red;font-weight:bold;"
)

Promise.all(
  apiList.map((v) => {
    if (v.json && v.json) {
      console.log(`${v.name}`)
      return commonGenerateApi(v.name, v.json)
    } else {
      return Promise.resolve()
    }
  })
).then(() => {
  console.log("%c ------更新成功--------", "color: green;font-weight:bold;")
})
