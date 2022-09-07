// eslint-disable-next-line import/no-mutable-exports
let baseURL = "",
  baseURLV2 = "",
  baseMsgURL = "",
  cupURL = ""

const baseHost = ""
const port = ""
const devHost = `${baseHost}:${port}`

export { baseURL, baseURLV2, baseMsgURL, cupURL }

console.log(
  `
  API_ENV: ${process.env.API_ENV}
  NODE_ENV: ${process.env.NODE_ENV}
  baseURL: ${baseURL}
  baseURLV2: ${baseURLV2}
  baseMsgURL: ${baseMsgURL}
  cupURL: ${cupURL}
  `
)
