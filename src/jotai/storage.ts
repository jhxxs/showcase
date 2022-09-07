import { getStorageSync, removeStorageSync, setStorageSync } from "@tarojs/taro"

/** 为`atomWithStorage`设置`storage`操作函数 */
export default {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}
