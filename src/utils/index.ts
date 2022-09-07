import { isWx } from "@/constants"
import {
  ENV_TYPE,
  getEnv,
  navigateBack,
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab
} from "@tarojs/taro"

export function pxTransform(num: number): string {
  if (isWx) {
    return `${num}px`
    // return _pxTransform(num * 2);
  } else if (getEnv() == ENV_TYPE.WEB) {
    return `${num}px`
  } else {
    return ""
  }
}

export function toRpx(num: number, designWidth: number = 750): string {
  return (375 / designWidth) * num * 2 + "rpx"
}

export function tovw(num: number) {
  return `${tovw_num(num)}vw`
}

export function tovw_num(num: number, designWidth: number = 750) {
  return (num / designWidth) * 100
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * 获取全局UUID
 */
const idList: number[] = []
export const getUUId = () => {
  let id = Number(Math.random().toString().slice(2, 3) + Date.now())
  if (idList.includes(id)) {
    id = getUUId()
  }
  idList.push(id)
  return id
}

/** `pxTransform`的简写 */
export { pxTransform as px } from "@tarojs/taro"

// export function ab2hex(buffer: ArrayBuffer, returnArray: false): string
export function ab2hex(buffer: ArrayBuffer): string
export function ab2hex(buffer: ArrayBuffer, returnArray: true): string[]
/**
 * ArrayBuffer转16进度字符串示例
 * @param buffer  要转换的`ArrayBuffer`
 * @param returnArray  返回数组还是字符串，默认`false`
 */
export function ab2hex(buffer: ArrayBuffer, returnArray?: boolean) {
  const hexArr = Array.from(new Uint8Array(buffer), (bit) =>
    bit.toString(16).padStart(2, "0")
  )
  return returnArray ? hexArr : hexArr.join("")
}

/**
 * 字符串转16进制
 * @param str
 * @returns
 */
export function str2hex(str: string) {
  var val = ""
  for (var i = 0; i < str.length; i++) {
    if (val == "") val = str.charCodeAt(i).toString(16)
    else val += "," + str.charCodeAt(i).toString(16)
  }
  return val
}

/**
 * 16进制转字符串
 * @param hex
 * @returns
 */
export function hex2str(hex: string) {
  const trimedStr = hex.trim()
  const rawStr =
    trimedStr.slice(0, 2).toLowerCase() === "0x"
      ? trimedStr.slice(2)
      : trimedStr
  var len = rawStr.length
  if (len % 2 !== 0) {
    // alert("Illegal Format ASCII Code!")
    return ""
  }
  var curCharCode: number
  var resultStr: string[] = []
  for (var i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.slice(i, i + 2), 16)
    resultStr.push(String.fromCharCode(curCharCode))
  }
  /** 过滤无法解析的字符 */
  let containSpecial = RegExp(/[^\x20-\x7E]+/g)
  const finalstr = resultStr.join("")
  return containSpecial.test(finalstr) ? "" : finalstr
}

/**
 * 字符串分隔
 * @param str
 * @param len
 */
export function stringChunk(str: string, len = 1): string[] {
  const strArr: string[] = []
  const n = len
  for (let i = 0, l = str.length; i < l / n; i++) {
    const a = str.slice(n * i, n * (i + 1))
    strArr.push(a)
  }
  return strArr
}

/**
 * 10进制转16进制（补0）
 * @param num 需要转的数字
 * @param maxLength 返回长度
 * @returns
 */
export function num2Hex(num: number, maxLength = 2) {
  return num.toString(16).padStart(maxLength, "0")
}

/**
 * CRC8校验
 * @param data hex string array
 * @returns
 */
export function crc8Maxim(data: string[]) {
  let crc = 0

  for (const el of data) {
    crc ^= parseInt(el, 16)
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x01) == 0x01) {
        crc = (crc & 0xff) >>> 1
        crc ^= 0x8c
      } else {
        crc = (crc & 0xff) >>> 1
      }
    }
  }
  return num2Hex(crc)
}

export function ab2str(buf: ArrayBuffer) {
  //@ts-ignore
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}

/**
 * 设备/房间排序
 * @desc 默认降序
 * @param isAscend - 是否升序
 */
export function simpleSort<T extends { sort?: number }>(
  a: T,
  b: T,
  isAscend?: boolean
) {
  return isAscend ? a.sort! - b.sort! : b.sort! - a.sort!
}

/**
 * ArrayBuffer解码，将ArrayBuffer转换位字符串
 * @param buffer
 * @returns
 */
export function ab2UTF16(buffer: ArrayBuffer) {
  const bf = new Uint8Array(buffer)
  let str = ""
  try {
    const decoder = new TextDecoder()
    str = decoder.decode(bf)
  } catch (error) {
    str = String.fromCharCode(...Array.from(bf))
    // 小程序没有 TextDecoder
    str = decodeURIComponent(str)
  }

  return str.replace(RegExp(/[^\x20-\x7E]+/g), "")
}

/**
 * 字符串加密后的数组
 * @param str
 * @returns
 */
export function str2abArray(str: string) {
  let ab: number[] = []
  try {
    const encoder = new TextEncoder()
    ab = Array.from(encoder.encode(str))
  } catch (error) {
    ab = str.split("").map((v) => v.charCodeAt(0))
  }
  return ab
}

/** 获取高四位 */
export function getHigh4(data: number) {
  return (data & 0xf0) >> 4
}

/** 获取低四位 */
export function getLow4(data: number) {
  return data & 0x0f
}

/** 获取低1`Byte` */
export function getLow8(data: number) {
  return data & 0xff
}

export const hex2num = (hex: string) => parseInt(hex, 16)

/**
 * 布尔值和数字互转
 * - boolean： `true` 转为 `1`; `false` 转为 `2`
 * - number | string, 只有`1`才会转为 `true` , 其他为 `false`
 */
export function boolVNum(value: boolean): 1 | 2
export function boolVNum(value: number | string): boolean
export function boolVNum(value: boolean | number | string) {
  if (typeof value === "boolean") {
    return value ? 1 : 2
  } else {
    return value == 1
  }
}

const JumpMap = {
  redirectTo,
  navigateTo,
  navigateBack,
  reLaunch,
  switchTab
}

type JumpType = typeof JumpMap
export type JumpTypeKey = keyof JumpType
export function jumpPage(type: JumpTypeKey) {
  const jump = JumpMap[type]
  return (jump || navigateTo) as JumpType[JumpTypeKey]
}
