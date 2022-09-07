import { ENV_TYPE, getEnv } from "@tarojs/taro"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import localeData from "dayjs/plugin/localeData"
import timezone from "dayjs/plugin/timezone"
import pkg from "../../package.json"

/** 小程序版本 */
export const version = pkg.version
/** 微信环境 */
export const isWx =
  getEnv() === ENV_TYPE.WEAPP ||
  // @ts-expect-error
  getEnv() == "miniprogram" ||
  // @ts-expect-error
  getEnv() === "Unknown"

export enum thingType {
  room = "room",
  device = "device"
}

dayjs.extend(localeData)
dayjs.extend(timezone)
dayjs.locale("zh-cn")

/** 周日-周六 */
export const weekdaysShort = dayjs.weekdaysShort()
/** 日-六 */
export const weekdaysMin = dayjs.weekdaysMin()

/** 周日-周六对象映射，用于排序 */
export const weekdaysMap = dayjs
  .weekdaysShort()
  .reduce<Record<string, number>>((m, c, index) => ({ ...m, [c]: +index }), {})

// console.log(weekdaysShort, weekdaysMap)

/**
 * 根据传进来的weekday对应索引需要展示的文案
 *
 * #### ⚠️ 注意，一周的时间为 `周日、周一、周二、周三、周四、周五、周六`，所以周日的索引是0，以此类推
 *
 * @description 如果周一到周六的每一天都有，则处理为`工作日`，如果周六和周日同时存在，则处理为`周末`，以此组合
 * @param days
 * @returns
 */
export function getWeekdaysText(days: ReadonlyArray<number>, seperator = "、") {
  const r = [...days].sort((a, b) => a - b).map((v) => weekdaysShort[v])

  let text = ""
  if (r.length > 0 && r.length < 7) {
    let workdayText = ""
    let weekendText = ""
    let workdays: string[] = []
    let weekends: string[] = []
    for (const i of r) {
      if (i === "周日" || i === "周六") {
        weekends.push(i)
      } else {
        workdays.push(i)
      }
    }

    workdayText = workdays.length < 5 ? workdays.join(seperator) : "工作日"
    weekendText = weekends.length < 2 ? weekends.join(seperator) : "周末"

    const joinCode = weekendText && workdayText ? seperator : ""
    const textArr = [weekendText, joinCode, workdayText]
    if (weekendText == "周六") textArr.reverse()

    text = textArr.join("")
  } else if (r.length >= 7) {
    text = "每天"
  } else {
    text = "仅一次"
  }

  return text
}

/** 混合式背景 */
export const blenderBg = ""
/** 分享封面 */
export const shareCover = ""

/** 已连接背景图 */
export const connectedImg = ""
/** 未连接背景图 */
export const unconnectedImg = ""
