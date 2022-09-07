// 系统相关

import { atom } from "jotai"

export interface SysState {
  /** 顶部状态栏高度 */
  statusBarHeight: number
  /** 状态栏高度 */
  navBarHeight: number
  navPaddingR: number
  /** 手机窗口高度 */
  windowHeight: number
  /** 手机屏幕高度 */
  screenHeight: number
}

/**
 *  系统相关状态
 *  长/宽/高之类的
 */
export const systemAtom = atom<SysState>({
  statusBarHeight: 0,
  navBarHeight: 0,
  navPaddingR: 0,
  windowHeight: 0,
  screenHeight: 0
})

/** 自定义导航栏的总高度（导航栏加状态栏高度） */
export const navHeightAtom = atom((get) => {
  const { navBarHeight, statusBarHeight } = get(systemAtom)
  return navBarHeight + statusBarHeight
})
