import { Text } from "@/pages/punchCard/components/types"
import {
  getSetting,
  authorize,
  showToast,
  saveImageToPhotosAlbum,
  downloadFile,
  nextTick,
  getCurrentInstance,
  createSelectorQuery
} from "@tarojs/taro"

type AuthSetting =
  | "scope.address"
  | "scope.camera"
  | "scope.invoice"
  | "scope.invoiceTitle"
  | "scope.record"
  | "scope.userInfo"
  | "scope.userLocation"
  | "scope.werun"
  | "scope.writePhotosAlbum"

/** 查询用户是否有授权
 *@params 授权scope 授权列表：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
 *@returns 是否有授权
 */
export const queryAuth = (scope: AuthSetting) =>
  new Promise((resolve) => {
    getSetting()
      .then((res) => {
        if (res.authSetting[scope]) {
          // 是否已经授权
          resolve(true)
        } else {
          // 没授权就去询问授权
          authorize({ scope })
            .then(() => {
              // 微信主动弹窗询问
              resolve(true)
            })
            .catch((e) => {
              console.log("错误信息", e)
              resolve(false)
            })
        }
      })
      .catch((e) => {
        showToast({
          title: e || "获取授权信息失败",
          icon: "none"
        })
      })
  })

// 调用小程序api保存图片到相册
const saveToAlbum = (filePath, index) =>
  new Promise((resolve, reject) => {
    saveImageToPhotosAlbum({ filePath })
      .then((res) => {
        if (res.errMsg === "saveImageToPhotosAlbum:ok") {
          resolve(true)
        } else {
          showToast({
            title: `第${index}图片保存失败，请重试`,
            icon: "none"
          })
          reject(new Error("保存失败,请重试"))
        }
      })
      .catch((e) => {
        reject(e)
      })
  })

/** 保存图片到相册
 *@params 授权scope
 *@returns 是否有授权
 */
export const saveImgAlbum = (url, index = 1) =>
  new Promise((resolve, reject) => {
    if (url.includes("http")) {
      // 网络图片必须先下载才能保存到相册
      downloadFile({
        url,
        success: (res) => {
          saveToAlbum(res.tempFilePath, index).then(
            () => resolve(true),
            (e) => reject(e)
          )
        },
        fail: (err) => {
          reject(new Error("下载网络图片出现错误"))
          showToast({
            icon: "none",
            title: err.errMsg || "下载网络图片出现错误"
          })
        }
      })
    } else {
      saveToAlbum(url, index).then(
        () => resolve(true),
        (e) => reject(e)
      )
    }
  })

/** 测量文本宽度 */
export const getTextWidth = (
  /** 要绘制的文本 */
  textData: Text,
  /** 用于测量文本的canvasId */
  id: string
) =>
  new Promise<number>((resolve) => {
    nextTick(() => {
      // 不延时可能会
      const { text, fontWeight, fontSize, fontFamily } = textData || {}
      const pageInstance = getCurrentInstance()?.page || {} // 拿到当前页面实例
      const query = createSelectorQuery().in(pageInstance)
      query
        .select(`#${id}`)
        .fields({ node: true, size: true, context: true }, (res) => {
          const canvas = res.node as HTMLCanvasElement
          const ctx = canvas.getContext("2d")!
          ctx.font = `${fontWeight ?? 400} ${fontSize ?? 28}px ${fontFamily}`
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { width } = ctx.measureText(text as string)
          resolve(Math.ceil(width))
        })
        .exec()
    })
  })
