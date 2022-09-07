import { pxTransform } from "@tarojs/taro"

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

/** 字符串转ArrayBuffer */
export function str2Uint8Array(str: string) {
  let ab: Uint8Array
  try {
    const encoder = new TextEncoder()
    ab = encoder.encode(str)
  } catch (error) {
    ab = new Uint8Array(str.split("").map((v) => v.charCodeAt(0)))
  }
  return ab
}

/**
 * CRC8校验
 * @param data hex string array
 * @returns
 */
export function crc8Maxim(data: Uint8Array | number[]) {
  let crc = 0
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i]
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x01) == 0x01) {
        crc = (crc & 0xff) >>> 1
        crc ^= 0x8c
      } else {
        crc = (crc & 0xff) >>> 1
      }
    }
  }
  return crc
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
 * 等同于`Java`的`String.getBytes('UTF-8')`
 * @desc 用于处理有汉字或emoj等非英文数字标点的情况
 */
export function getBytes(str = "") {
  const utf8: number[] = []
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i)
    if (charCode < 0x80) utf8.push(charCode)
    else if (charCode < 0x800) {
      utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f))
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      utf8.push(
        0xe0 | (charCode >> 12),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      )
    } else {
      i++
      // Surrogate pair:
      // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
      // splitting the 20 bits of 0x0-0xFFFFF into two halves
      charCode =
        0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      utf8.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      )
    }
  }
  return utf8
}

export const formQuery = <T = Record<string, any>>(data: T) =>
  Object.entries(data)
    .map((v) => `${v[0]}=${v[1]}`)
    .join("&")

export function getInt64Bytes(x: number) {
  // const y = Math.floor(x / 2 ** 32)
  // return [y, y << 8, y << 16, y << 24, x, x << 8, x << 16, x << 24].map(
  //   (z) => z >>> 24
  // )
  const arr = new ArrayBuffer(4)
  const view = new DataView(arr)
  view.setUint32(0, x, false)
  return [...new Uint8Array(arr).values()]
}

export function intFromBytes(byteArr: number[]) {
  return byteArr.reduce((a, c, i) => a + c * 2 ** (56 - i * 8), 0)
}

export const geId = () => Math.random().toString(36).slice(-6)

/** 判断是否是`ArrayBuffer` */
export function isArrayBuffer(data: any): data is ArrayBuffer {
  return (
    data instanceof ArrayBuffer ||
    Object.prototype.toString.call(data) === "[object ArrayBuffer]"
  )
}

/** 生成4个方向的值，便于`styled components`使用行间样式 */
export function get4Value(space: number[]) {
  return space
    .slice(0, 4)
    .map((v) => `${pxTransform(v)}`)
    .join(" ")
}

export const hex2rgb = (hex: string) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) || [0, 0, 0]
