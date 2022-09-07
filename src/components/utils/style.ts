import { pxTransform } from "@tarojs/taro"
import { isArray } from "lodash"

const REGEXP2 = new RegExp('{|}|"|[|]', "g")

export function keys(obj: Record<string, any>) {
  return JSON.stringify(obj)
    .replace(REGEXP2, "")
    .split(",")
    .map((item) => item.split(":")[0])
}

/** 将`className`转化为`class-name` */
export function kebabCase(word: string) {
  const newWord = word
    .replace(new RegExp("[A-Z]", "g"), (i) => "-" + i)
    .toLowerCase()

  return newWord
}

export function isPlainObject(obj: any): obj is Record<any, any> {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

type StyleParams = Record<any, any> | StyleParams[] | string

export function style(styles: StyleParams): string {
  if (isArray(styles)) {
    return styles
      .filter((item: any) => item != null && item !== "")
      .map((item: any) => style(item))
      .join(";")
  }

  if (isPlainObject(styles)) {
    return keys(styles)
      .filter((key) => styles[key] != null && styles[key] !== "")
      .map((key) => [kebabCase(key), [styles[key]]].join(":"))
      .join(";")
  }

  if (typeof styles == "string") return styles
  else return ""
}

/** 生成4个方向的值，便于`styled components`使用行间样式 */
export function get4Value(space: number[]) {
  return space
    .slice(0, 4)
    .map((v) => `${pxTransform(v)}`)
    .join(" ")
}
