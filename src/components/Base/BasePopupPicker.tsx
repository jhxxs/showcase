import { Theme } from "@/constants/theme"
import { css } from "@linaria/core"
import { Button, Popup } from "@taroify/core"
import { PickerView, PickerViewColumn, View } from "@tarojs/components"
import clsx from "clsx"
import { range } from "lodash"
import { memo, useEffect, useMemo, useState } from "react"
import Flex from "./Flex"

type BasePopupProps = {
  /** 输入框值 */
  value: number[]
  /** 选项列表 */
  options: number[][]
  title?: string
  show?: boolean
  unit?: string | string[]
  onClose?: (e: boolean) => void
  onConfirm?: (e: BasePopupProps["value"]) => void
  /** 分隔符className */
  optionSeparatorClassName?: string
}

/** 高度范围表 */
export const heightList = [range(50, 301)]
/** 重量范围表 */
export const weightList = [range(30, 201), range(1, 10)]
const minAge = 12,
  maxAge = 99,
  currentYear = 2022,
  minYear = currentYear - maxAge,
  maxYear = currentYear - minAge + 1
/** 出生年份表 */
export const yearList = [range(minYear, maxYear), range(1, 13)]
// console.log("yearList", yearList)

export function float2arr(num: number) {
  const arr = `${num ?? 0}`.split(".").map((v) => +v)
  arr.push(0)
  return arr.slice(0, 2)
}

export function birthay2arr(birthday: string) {
  const [year, month] = birthday.split("-")
  // console.log("birthay2arr", birthday, year, month)
  return [+year, +month]
}

/** 带picker的popup弹窗 */
const BasePopupPicker = memo((props: BasePopupProps) => {
  const defaultValue = useMemo(() => {
    return props.options.map((v, index, arr) => {
      const middle = Math.floor(arr[index].length / 2)
      const currentValue = props.value[index]
      let currentIndex = v.findIndex((sv) => sv == currentValue)
      currentIndex = currentIndex > 0 ? currentIndex : middle
      return currentIndex
    })
  }, [props.options, props.value])

  // console.log(defaultValue)

  const [value, setValue] = useState([0, 0])

  const units = useMemo(
    () => (Array.isArray(props.unit) ? props.unit : [props.unit]),
    [props.unit]
  )

  useEffect(() => {
    if (props.show) {
      setValue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])

  return (
    <>
      <Popup
        open={props.show}
        onClose={props.onClose}
        placement="bottom"
        rounded
        catchMove
      >
        <Popup.Backdrop />
        <View
          className={css`
            position: relative;
          `}
        >
          <View
            className={css`
              font-size: 30px;
              font-weight: 500;
              text-align: center;
              height: 112px;
              line-height: 112px;
            `}
          >
            {props.title}
          </View>
        </View>
        <View
          className={clsx(
            css`
              padding: 0 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              height: 456px;
            `,
            props.optionSeparatorClassName
          )}
        >
          <View
            className={css`
              flex: 1;
              position: relative;
              width: 100%;
              height: 100px;
              align-items: center;
              /* justify-content: center; */
              display: flex;
            `}
          >
            {units.map((v, vIndex, arr) => (
              <View
                className={clsx(
                  css`
                    font-size: 32px;
                    /* position: absolute; */
                    height: 100px;
                    line-height: 100px;
                    color: ${Theme.textSeond};
                    /* width: 100%; */
                    text-align: center;
                    padding-left: 170px;
                    vertical-align: bottom;
                    z-index: 2;
                    flex: 1;
                  `,
                  props.options.length > 1
                    ? arr.length > 1
                      ? css`
                          /* width: 50%; */
                          padding-left: 0;
                          width: 50%;
                        `
                      : css`
                          width: 100%;
                          padding-left: calc(170px + 200px);
                        `
                    : css`
                        width: 100%;
                        padding-left: calc(170px + 200px);
                      `,

                  arr.length > 1
                    ? vIndex <= 0
                      ? css`
                          padding-left: 220px;
                        `
                      : css`
                          padding-left: 0;
                          text-indent: -80px;
                        `
                    : ""
                )}
              >
                {v}
              </View>
            ))}
          </View>
          <View
            className={css`
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 2;
              background: transparent;
            `}
          >
            <PickerView
              value={value}
              className={css`
                background: transparent;
                height: 100%;
                box-sizing: border-box;
                width: 100%;
                border-radius: 20px;
                overflow: hidden;
                position: relative;
              `}
              immediateChange
              indicatorClass={css`
                height: 100px;
              `}
              onChange={(e) => {
                setValue(e.detail.value)
              }}
            >
              {props.options?.map((el, index, options) => (
                <PickerViewColumn>
                  {el.map((v) => (
                    <View
                      className={clsx(
                        css`
                          font-size: 48px;
                          color: #333;
                        `
                      )}
                    >
                      <View
                        className={clsx(
                          css`
                            width: 200px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          `,
                          // 只有一排选项时，居中
                          options.length <= 1 &&
                            css`
                              width: 100%;
                            `,
                          // 两排选项，中间为分隔符，限制宽度
                          options.length > 1 &&
                            index <= 0 &&
                            css`
                              float: right;
                            `
                        )}
                      >
                        {v}
                      </View>
                    </View>
                  ))}
                </PickerViewColumn>
              ))}
            </PickerView>
          </View>
        </View>
        <View
          className={css`
            padding: 32px 48px 16px;
          `}
        >
          <Flex.Row gutter={48}>
            <Flex.Col span={12}>
              <Button
                shape="round"
                block
                className={css`
                  border: none !important;
                  background: #f8f8f8;
                  color: ${Theme.textThird};
                `}
                onClick={() => {
                  props?.onClose?.(false)
                }}
              >
                取消
              </Button>
            </Flex.Col>
            <Flex.Col span={12}>
              <Button
                shape="round"
                block
                className={css`
                  border: none !important;
                  background: ${Theme.themeYellow};
                `}
                style={{ color: `${Theme.textFirst}` }}
                onClick={() => {
                  props?.onClose?.(false)
                  const data = value.map(
                    (v, index) => props.options[index][v] ?? props.value[index]
                  )
                  props?.onConfirm?.(data)
                }}
              >
                确定
              </Button>
            </Flex.Col>
          </Flex.Row>
        </View>
      </Popup>
    </>
  )
})

export default BasePopupPicker
export const decimalSeparator = css`
  ::after {
    content: ".";
    display: block;
    position: absolute;
    font-size: 48px;
    color: ${Theme.textFirst};
  }
`
