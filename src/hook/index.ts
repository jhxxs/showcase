import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync
} from "@tarojs/taro"

export const productKeys = ["TKGTDdE", "S9ShwoI"]

export const isValidProduct = (key: string) => productKeys.includes(key)

export const getSystem = () => {
  const {
    statusBarHeight = 0,
    windowWidth,
    windowHeight,
    screenHeight
  } = getSystemInfoSync()
  // console.log("windowHeight", windowHeight)
  const { height, top, left } = getMenuButtonBoundingClientRect()
  const navBarHeight = (top - statusBarHeight) * 2 + height
  const navPaddingR = windowWidth - left

  return {
    navBarHeight,
    statusBarHeight,
    windowHeight,
    navPaddingR,
    screenHeight
  }
}
