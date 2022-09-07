import { Theme } from "@/constants/theme"
import { DatetimePicker, Popup } from "@taroify/core"
import { View } from "@tarojs/components"
import { css } from "linaria"

import { useState } from "react"
import Flex from "./Flex"

/** 出生年月选择器 */
const BirthdayPicker: React.FC<{
  open?: boolean
  onClose?: (e: boolean) => void
}> = (props) => {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [defaultValue] = useState(new Date(2021, 0, 17))

  return (
    <Popup
      open={props.open}
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
          生日
        </View>
      </View>

      <DatetimePicker
        className={css`
          display: flex;
          flex-direction: column;
          /* .taroify-picker {
            &__toolbar {
              order: 1;
            }
          } */
        `}
        type="year-month"
        min={minDate}
        max={maxDate}
        defaultValue={defaultValue}
        formatter={(type, val) => {
          if (type === "year") {
            return `${val}年`
          }
          if (type === "month") {
            return `${val}月`
          }
          return val
        }}
        onConfirm={(e) => {
          console.log("confirm", e)
        }}
        onCancel={(e) => {
          console.log("cancel", e)
        }}
      >
        <View
          className={css`
            order: 1;
            .taroify-picker {
              &__toolbar {
                margin: 0 -12px;
              }

              &__cancel,
              &__confirm {
                height: 88px;
                flex: 1;
                margin: 0 12px;
                border-radius: 499px;
                font-size: 32px;
                position: relative;
                &::before {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 100%;
                  height: 100%;
                  content: " ";
                  background: var(--black, #000);
                  border-color: var(--black, #000);
                  border-style: inherit;
                  border-width: inherit;
                  border-radius: inherit;
                  /* inherit parent's border radius */
                  opacity: 0;
                  transform: translate(-50%, -50%);
                }

                &:active::before {
                  opacity: 0.1;
                }
              }

              &__cancel {
                background: #f8f8f8;
                border: none !important;
                color: ${Theme.textThird};
                &:active {
                  color: ${Theme.textThird};
                }
              }

              &__confirm {
                border: none !important;
                background: ${Theme.themeYellow};
                color: ${Theme.textFirst};
                &:active {
                  color: ${Theme.textFirst};
                }
              }
            }
          `}
        >
          <DatetimePicker.Toolbar
            className={css`
              padding: 32px 48px 16px;
            `}
          >
            <DatetimePicker.Button>取消</DatetimePicker.Button>
            <DatetimePicker.Button>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </View>
      </DatetimePicker>
    </Popup>
  )
}

export default BirthdayPicker
