import { getFileSystemManager } from "@tarojs/taro"
import mimeMap from "./mimeMap"

interface WXFile {
  name: string
  buffer: ArrayBuffer | string
  fileName: string
}
/**
 * 在小程序中使用formdata上传数据，可实现多文件上传
 * @see [wx-formdata](https://github.com/zlyboy/wx-formdata)
 * @description 源码使用CJS，这里改为ts
 */

export default class WXFormData {
  data: Record<string, any> = {}
  files: WXFile[] = []

  append(name: string, value: any) {
    this.data[name] = value
    return true
  }

  appendFile(name: string, path: string) {
    let buffer = getFileSystemManager().readFileSync(path)
    if (Object.prototype.toString.call(buffer).indexOf("ArrayBuffer") < 0) {
      return false
    }
    this.files.push({
      name: name,
      buffer: buffer,
      fileName: getFileNameFromPath(path)
    })
    return true
  }

  getData() {
    return convert(this.data, this.files)
  }
}

function getFileNameFromPath(path: string) {
  const idx = path.lastIndexOf("/")
  return path.slice(idx + 1)
}

function convert(data: Record<string, any>, files: WXFile[]) {
  // 数据分割符，一般是随机的字符串
  const boundaryKey = "wxmpFormBoundary" + randString()
  const boundary = "--" + boundaryKey
  const endBoundary = boundary + "--"

  let postArray: number[] = []
  //拼接参数
  if (data && Object.prototype.toString.call(data) == "[object Object]") {
    for (const key in data) {
      postArray = postArray.concat(formDataArray(boundary, key, data[key]))
    }
  }
  //拼接文件
  if (files && Object.prototype.toString.call(files) == "[object Array]") {
    for (const i in files) {
      const file = files[i]
      postArray = postArray.concat(
        formDataArray(boundary, file.name, file.buffer, file.fileName)
      )
    }
  }
  //结尾
  const endBoundaryArray: number[] = []
  endBoundaryArray.push(...toUtf8Bytes(endBoundary))
  postArray = postArray.concat(endBoundaryArray)
  return {
    contentType: "multipart/form-data; boundary=" + boundaryKey,
    buffer: new Uint8Array(postArray).buffer
  }
}

function randString() {
  let res = ""
  for (let i = 0; i < 17; i++) {
    const n = parseInt(`${Math.random() * 62}`)
    if (n <= 9) {
      res += n
    } else if (n <= 35) {
      res += String.fromCharCode(n + 55)
    } else {
      res += String.fromCharCode(n + 61)
    }
  }
  return res
}

function formDataArray(
  boundary: string,
  name: string,
  value: any,
  fileName?: string
) {
  let dataString = ""
  const isFile = !!fileName

  dataString += boundary + "\r\n"
  dataString += 'Content-Disposition: form-data; name="' + name + '"'
  if (isFile) {
    dataString += '; filename="' + fileName + '"' + "\r\n"
    dataString += "Content-Type: " + getFileMime(fileName!) + "\r\n\r\n"
  } else {
    dataString += "\r\n\r\n"
    dataString += value
  }

  let dataArray: number[] = []
  dataArray.push(...toUtf8Bytes(dataString))

  if (isFile) {
    let fileArray = new Uint8Array(value)
    dataArray = dataArray.concat(Array.prototype.slice.call(fileArray))
  }
  dataArray.push(...toUtf8Bytes("\r"))
  dataArray.push(...toUtf8Bytes("\n"))

  return dataArray
}

function getFileMime(fileName: File["name"]) {
  const idx = fileName.lastIndexOf(".")
  const mime = mimeMap[fileName.slice(idx)]
  return mime ? mime : "application/octet-stream"
}

function toUtf8Bytes(str: string) {
  const bytes: number[] = []
  for (let i = 0; i < str.length; i++) {
    bytes.push(...utf8CodeAt(str, i))
    // @ts-expect-error
    if (str.codePointAt(i) > 0xffff) {
      i++
    }
  }
  return bytes
}

function utf8CodeAt(str: string, i: number) {
  let out: number[] = [],
    p = 0
  let c = str.charCodeAt(i)
  if (c < 128) {
    out[p++] = c
  } else if (c < 2048) {
    out[p++] = (c >> 6) | 192
    out[p++] = (c & 63) | 128
  } else if (
    (c & 0xfc00) == 0xd800 &&
    i + 1 < str.length &&
    (str.charCodeAt(i + 1) & 0xfc00) == 0xdc00
  ) {
    // Surrogate Pair
    // eslint-disable-next-line no-param-reassign
    c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff)
    out[p++] = (c >> 18) | 240
    out[p++] = ((c >> 12) & 63) | 128
    out[p++] = ((c >> 6) & 63) | 128
    out[p++] = (c & 63) | 128
  } else {
    out[p++] = (c >> 12) | 224
    out[p++] = ((c >> 6) & 63) | 128
    out[p++] = (c & 63) | 128
  }
  return out
}
