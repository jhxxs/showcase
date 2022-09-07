import type { Config, SubPackage } from "@tarojs/taro"
import dayjs from "dayjs"

const isSubPackage = process.env.NODE_ENV === "development"
// const isNeed = process.env.NODE_ENV === "production"
let isNeed = true
// isNeed = false

const RouterMap = {
  /** tabbar */
  TAB: {
    root: "tab",
    isSubPackage: false,
    pages: {
      /** 首页 */
      HOME: { url: "home/index", needAuth: false, isNeed },
      /** 我的 */
      MINE: { url: "mine/index", needAuth: false, isNeed }
    }
  },
  /** 个人信息模块 */
  MINE: {
    root: "mine",
    isSubPackage,
    pages: {
      /** 个人信息展示页面 */
      PROFILE: { url: "profile/index", needAuth: true, isNeed: true },
      /** 设置页面，查看隐私策略，注销账号等 */
      SETTING: { url: "setting/index", needAuth: true, isNeed }
    }
  },
  /** 账户中心 */
  ACCOUNT: {
    root: "account",
    isSubPackage,
    pages: {
      /** 微信登录页 */
      AUTH: { url: "auth/index", needAuth: false, isNeed: true }
    }
  },
  /** 帮助等页面 */
  HELP: {
    root: "help",
    isSubPackage,
    pages: {
      /** 关于 */
      ABOUT: { url: "about/index", needAuth: false, isNeed },
      /** 设置 */
      SETTING: { url: "setting/index", needAuth: false, isNeed: true }
    }
  }
}

type SinglePage = {
  /** 子页面路径 */
  url: string
  /** 是否需要授权 */
  needAuth?: boolean
  /** 是否需要生成页面 */
  isNeed?: boolean
}

/** 路由配置 */
type RouteConfig = Record<
  Uppercase<string>,
  {
    /** 父级路径 */
    root: string
    /** 是否分包 */
    isSubPackage?: boolean
    /** 页面 */
    pages: Record<Uppercase<string>, SinglePage>
  }
>

type GetRouterConfig<T extends RouteConfig> = Record<
  {
    [K in keyof T]: keyof T[K]["pages"] extends ""
      ? K
      : // @ts-expect-error
        `${K}_${keyof T[K]["pages"]}`
  }[keyof T],
  string
>

// const camelCase2UpperUnderline = (str: string) =>
//   str
//     .replace(/[A-Z]{1}[a-z]+|[A-Z]+/g, (match) => "_" + match)
//     .split("_")
//     .map((v) => v.toUpperCase())
//     .join("_")

// console.log(camelCase2UpperUnderline("okGoodCamelCase2UpperUnderline"))

/** 生成路由信息对象 */
export const RouterName = Object.entries(RouterMap as RouteConfig).reduce<
  GetRouterConfig<typeof RouterMap>
>((map, [name, { root, pages }]) => {
  // console.log("reduce:", name, root)
  return Object.entries(pages).reduce(
    (subMap, [subName, page]) => ({
      ...subMap,
      ...(page.isNeed
        ? {
            [`${name}${subName ? "_" : ""}${[
              subName
            ]}`]: `pages/${root}/${page.url}`
          }
        : {})
    }),
    map
  )
}, {} as any)

console.log(
  "RouterMap",
  /** RouterMap, */
  RouterName,
  dayjs().format("HH:mm:ss")
)

/** 分包页面 */
const subPackages = Object.values(RouterMap as RouteConfig).reduce<
  SubPackage[]
>((list, item) => {
  // console.log(item)
  if (item.isSubPackage) {
    list.push({
      root: `pages/${item.root}`,
      pages: Object.values(item.pages)
        .filter((v) => v.url && v.isNeed)
        .map((v) => v.url)
    })
  }
  return list
}, [])

// console.log("分包：", subPackages)

/** 页面配置 */
const pages = Object.values(RouterMap as RouteConfig).reduce<string[]>(
  (list, item) => {
    if (!item.isSubPackage) {
      list.push(
        ...Object.values(item.pages)
          .filter((v) => v.url && v.isNeed)
          .map((v) => `pages/${item.root}/${v.url}`)
      )
    }
    return list
  },
  []
)

/** 需要授权的页面 */
export const authPages = Object.values(RouterMap as RouteConfig).reduce<
  string[]
>((list, item) => {
  if (item.isSubPackage) {
    list.push(
      ...Object.values(item.pages)
        .filter((v) => v.needAuth)
        .map((v) => v.url)
    )
  }
  return list
}, [])

console.log("authPages", authPages)

console.log("分包：", subPackages)
console.log("页面：", pages)

export default {
  pages,
  subPackages,
  window: {
    backgroundTextStyle: "dark",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTitleText: "worthcloud",
    navigationBarTextStyle: "black",
    backgroundColor: "#ffffff"
  },
  usingComponents: {
    iconfont: "components/Iconfont/weapp/weapp"
  },
  lazyCodeLoading: "requiredComponents"
} as Config
