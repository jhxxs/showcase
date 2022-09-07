import { RouterName } from "@/app.config"
import { Theme } from "@/constants/theme"
import { ACCESS_TOKEN } from "@/jotai"
import {
  showModal as _showModal,
  navigateTo,
  getStorageSync
} from "@tarojs/taro"

type ModalOption = NonNullable<GetArg<typeof _showModal>>

const commonModalOption: Partial<ModalOption> = {
  confirmColor: Theme.textFirst,
  cancelColor: Theme.textThird
}

/** 显示模态对话框 */
export const showModal = (option: ModalOption | undefined) =>
  _showModal({
    ...commonModalOption,
    ...option
  })

/** 提示去授权登录 */
export const showLoginModal = () =>
  new Promise<void>(async (resolve) => {
    const res = await showModal({
      content: "当前用户未授权，是否去登录？"
    })
    if (res.confirm) {
      navigateTo({ url: `/${RouterName.ACCOUNT_AUTH}` })
      resolve()
    }
  })

export const getToken = () => getStorageSync(ACCESS_TOKEN)
