import { Theme } from "@/constants/theme"
import { css } from "@linaria/core"
import { Text, View } from "@tarojs/components"
import { useDeepCompareEffect } from "ahooks"
import clsx from "clsx"
import dayjs from "dayjs"
import { EChartOption } from "echarts"
import { forwardRef, useCallback, useRef } from "react"
import EChart from "techarts"
// @ts-expect-error
import * as echarts from "@/utils/echarts.min.js"
import { showModal } from "@/utils/common"
import { cupService } from "@/service/BaseAxiosInstance"

export type BarChartRef = InstanceType<typeof EChart> | null

type StatisticItem = {
  label: string
  unit?: string
  value: number
}

export type BarChartProps = {
  /** 日期类型 */
  dateType?: GroupType
  /** 图表统计 */
  total?: number
  /** 图表总计单位 */
  unit?: string
  /** 时间 */
  timeText?: string
  /** 图表标签 */
  label?: string
  /** 标签字体颜色 */
  labelColor?: string
  /** 标签背景 */
  labelBg?: string
  /** echarts的`canvasId`，和id一样需要保持唯一性 */
  canvasId: string
  /** 图表下的统计数据 */
  statisticList?: StatisticItem[]
  /** x，y轴数据[x, y] */
  data: [string | number, number][]
  /** 柱状图渐变色开始 */
  startColor: string
  /** 柱状图渐变色结束 */
  endColor: string
  /** 柱状图背景 */
  barBg?: string
  __trigger?: boolean
}

const numParse = (num: number) => (num ?? 0).toLocaleString()

type GroupType = "day" | "week" | "month" | "year"

const BarChart = forwardRef<
  BarChartRef,
  React.PropsWithChildren<BarChartProps>
>(
  ({
    total = 0,
    unit = "",
    timeText = "",
    label = "",
    labelColor = "#000",
    labelBg = "#fafafa",
    canvasId,
    data = [],
    statisticList = [],
    // startColor = "",
    barBg = "",
    // endColor = "",
    dateType = "day",
    __trigger
  }) => {
    const charRef = useRef<BarChartRef>(null)

    const getOption = useCallback(
      (seriesData: [string | number, number][]): EChartOption => {
        // console.info("🥳🥳🥳🥳🥳 getOption")

        return {
          grid: {
            left: 38 + 16,
            right: 16,
            top: 20,
            bottom: 20
          },
          tooltip: {
            trigger: "axis",
            triggerOn: "mousemove",
            axisPointer: {
              type: "shadow"
            },
            padding: [12, 16],
            formatter: (params = []) => {
              const [seriesItem] = params as [
                { data: [string | number, number] }
              ]

              const [date, value = 0] = seriesItem?.data || []
              const now = dayjs(date || undefined)
              let timeStr = ""
              if (dateType == "day") {
                timeStr = now.format("H时")
              } else if (dateType == "week") {
                timeStr = `${now.format("YYYY年M月D日 ddd")}`
              } else if (dateType == "month") {
                timeStr = now.format("YYYY年M月D日")
              } else if (dateType == "year") {
                timeStr = now.format("YYYY年M月")
              }
              // ⚠️ 缩进不能改
              return `${numParse(value)}${unit}
${timeStr}`
            },
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderWidth: 2,
            textStyle: {
              color: "#666",
              fontSize: 18
            },
            alwaysShowContent: false
          },
          axisPointer: {
            shadowStyle: {
              color: "rgba(246, 247, 251, 0.5)"
            }
          },
          xAxis: {
            type: "category",
            interval: 2,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#646464",
              fontSize: 12,
              formatter: (date: string) => {
                const now = dayjs(date || undefined)
                if (dateType == "day") {
                  return now.hour()
                } else if (dateType == "week") {
                  return now.format("dd")
                } else if (dateType == "month") {
                  return now.date()
                } else if (dateType == "year") {
                  return now.month() + 1
                }
              }
            },
            boundaryGap: true
          },
          yAxis: {
            min: "dataMin",
            type: "value",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#E6E6E6"
              }
            },
            axisLabel: {
              color: "#646464",
              fontSize: 12
            }
          },
          series: [
            {
              data: seriesData,
              type: "bar",
              z: 10,
              barWidth: 6, //柱图宽度
              itemStyle: {
                borderRadius: [2, 2, 0, 0],
                color: barBg
                // color: {
                //   type: "linear",
                //   x: 1,
                //   y: 1,
                //   x2: 0,
                //   y2: 0,
                //   colorStops: [
                //     {
                //       offset: 0.7,
                //       color: startColor
                //     },
                //     {
                //       offset: 0,
                //       color: endColor
                //     }
                //   ],
                //   global: false // 缺省为 false
                // }
              }
            }
          ]
        }
      },
      [barBg, dateType, unit]
    )

    const timer = useRef<any>()

    useDeepCompareEffect(() => {
      // console.log("BarChart useEffect", canvasId, data)
      clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        charRef.current?.setOption(getOption(data))
      }, 50)
    }, [data])

    return (
      <>
        <View
          className={css`
            margin-top: 32px;
            background: #fff;
            border-radius: 24px;
            padding: 32px 0;
            box-shadow: 0px 6px 18px 0px rgba(165, 165, 165, 0.16);
          `}
        >
          {/* 标题 */}
          <View
            className={css`
              padding: 0 32px;
              margin-bottom: 32px;
            `}
          >
            <View
              className={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: ${Theme.textSeond};
                font-size: 24px;
                line-height: 36px;
              `}
            >
              <View onClick={handleClear}>总计</View>
              <View>{timeText}</View>
            </View>
            <View
              className={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <View
                className={css`
                  font-size: 44px;
                  font-weight: 500;
                  color: ${Theme.textFirst};
                  margin-top: 4px;
                `}
              >
                {numParse(total)}
                {unit && (
                  <Text
                    className={css`
                      margin-left: 4px;
                      font-weight: 400;
                      font-size: 24px;
                      color: ${Theme.textSeond};
                    `}
                  >
                    {unit}
                  </Text>
                )}
              </View>
              <View
                style={{ color: labelColor, background: labelBg }}
                className={css`
                  width: 84px;
                  height: 32px;
                  border-radius: 21px;
                  font-size: 20px;
                  text-align: center;
                  margin-top: 20px;
                `}
              >
                {label}
              </View>
            </View>
          </View>

          {/* 图表 */}
          <View
            className={css`
              height: 500px;
            `}
          >
            <EChart
              echarts={echarts}
              canvasId={canvasId}
              ref={charRef}
              option={{}}
            />
          </View>

          {/* 统计 */}
          <View
            className={css`
              display: flex;
              padding: 60px 32px 8px;
            `}
          >
            {statisticList.map((v, index, arr) => (
              <View
                className={clsx(
                  css`
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                  `,
                  index < arr.length - 1
                    ? // 分割线
                      css`
                        ::after {
                          display: block;
                          content: "";
                          position: absolute;
                          height: 45px;
                          width: 1px;
                          background: #f2f2f2;
                          align-self: flex-end;
                        }
                      `
                    : ""
                )}
              >
                <View
                  className={css`
                    color: ${Theme.textSeond};
                    font-size: 24px;
                  `}
                >
                  {v.label}
                </View>
                <View
                  className={css`
                    color: #222;
                    font-size: 32px;
                    font-weight: 500;
                    margin-top: 12px;
                  `}
                >
                  {numParse(v.value)}
                  {v.unit && (
                    <Text
                      className={css`
                        font-weight: 400;
                        font-size: 24px;
                        color: ${Theme.textSeond};
                        margin-left: 4px;
                      `}
                    >
                      {v.unit}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
    )
  }
)

export default BarChart
