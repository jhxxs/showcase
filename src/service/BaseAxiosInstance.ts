/* eslint-disable no-param-reassign */
import { RouterName } from "@/app.config"
import { isWx } from "@/constants"
import { ACCESS_TOKEN } from "@/jotai"
import { showLoginModal } from "@/utils/common"
import {
  getStorageSync,
  navigateTo,
  removeStorageSync,
  showToast
} from "@tarojs/taro"
import axios, { AxiosInstance } from "axios"
import mpAdapter from "axios-miniprogram-adapter"
import { isArrayBuffer } from "lodash"
import { baseURL } from "./config"
import { Api as base } from "./server"

function apiSignature(...args: any) {
  return ""
}

/** 响应码 */
export enum ResponseCode {
  "TokenExpired" = 20202,
  "Successful" = 200,
  "ShareTokenInvalid" = 21607,
  "PermissionFail" = 20326,
  /** 验证码获取频繁 */
  "AuthCodeBusy" = 20345,
  /** 行为验证失败 */
  "TencentCaptchaError" = 20343
}

export enum AppInfo {
  app_key = "",
  app_secret = ""
}

export const CancelToken = axios.CancelToken

export default function BaseAxiosInstance(
  axiosInstance: AxiosInstance,
  url: string
) {
  axiosInstance.defaults.baseURL = url
  axiosInstance.defaults.httpsAgent = true
  axiosInstance.defaults.headers = { "Content-Type": "application/json" }

  /** 小程序兼容 */
  if (isWx) {
    axiosInstance.defaults.adapter = mpAdapter
  } else {
    axiosInstance.defaults.timeout = 5 * 60 * 1000
  }

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      // TODO
      // config.headers["lan"] = i18n.locale
      //   .split("-")
      //   .map((v, i) => (i <= 0 ? v : v.toUpperCase()))
      //   .join("_")

      const token = getStorageSync(ACCESS_TOKEN)
      if (!token && !config.url?.match("login")) {
        showLoginModal()
        throw Error("token need")
      }

      const timestamp = Math.round(Date.now() / 1000)
      /** 添加appkey，sn，ts */
      config.headers["app_key"] = AppInfo.app_key
      // config.headers["app_id"] = AppInfo.app_secret
      /** 时间戳 */
      config.headers["ts"] = timestamp

      const BearerToken = token ? `Bearer ${token}` : ""

      if (token) {
        /** token */
        config.headers.Authorization = BearerToken
      }

      /** 签名 */
      config.headers["sn"] = apiSignature(
        AppInfo.app_key,
        AppInfo.app_secret,
        timestamp,
        BearerToken,
        isArrayBuffer(config.data) ? undefined : config.data
      )

      return config
    },
    (err) => {
      console.log("🧱请求拦截错误：", err)
      return Promise.reject(err)
    }
  )

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data.code == ResponseCode["Successful"]) {
        return response.data
      } else {
        if (response.data.code == ResponseCode["TokenExpired"]) {
          console.log("Token Expired")

          console.log(response.data.msg)
          removeStorageSync(ACCESS_TOKEN)

          navigateTo({ url: `/${RouterName.ACCOUNT_AUTH}` })
        } else {
          showToast({
            title: response.data.msg,
            icon: "none"
          })
          return Promise.reject(response.data)
        }
      }
    },
    (error) => {
      console.log("⚠️请求响应错误：", error)

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

const serverList = {
  base: {
    Server: base,
    url: baseURL
  }
}

type ServerList = typeof serverList
type ServiceMapType = {
  [K in keyof ServerList]: InstanceType<ServerList[K]["Server"]>
}

/** 接口实例对象 */
export const ServiceMap = Object.entries(serverList).reduce<ServiceMapType>(
  (map, [name, { Server, url }]) => {
    const server = new Server()
    server.instance = BaseAxiosInstance(server.instance, url)
    return {
      ...map,
      [name]: server
    }
  },

  {} as ServiceMapType
)

export const baseService = ServiceMap.base
