import { Theme } from "@/constants/theme"
import { px } from "@/utils"
import { css } from "@linaria/core"
import { Button, Dialog, Field, Input } from "@taroify/core"
import type { FieldProps } from "@taroify/core/field/field"
import type { InputProps } from "@taroify/core/input"
import { View } from "@tarojs/components"
import { showToast } from "@tarojs/taro"
import { useEffect, useRef, useState } from "react"

const flexItem = css`
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
`

type PromptAction = "close" | "cancel" | "confirm"

type OmitField = Omit<FieldProps, "align">
type OmitInput = Omit<InputProps, "onConfirm">

type BasePromptProps = OmitField &
  OmitInput & {
    /** 输入框值 */
    value?: string
    /** 输入框`placeholder` */
    placeholder?: string
    /** 输入框最大长度 */
    maxlength?: number
    title?: string
    show?: boolean
    /* 单位 */
    unit?: string
    onClose?: (e: false) => void
    // onCancel?: (e: false) => void
    onConfirm?: (e: BasePromptProps["value"]) => void
    /** 输入框类型 */
    type?: InputProps["type"]
    /** 是否验证 */
    shouldValidate?: boolean
    name?: string
  } & {
    beforeClose?: (
      action: PromptAction,
      e?: string
    ) => boolean | Promise<boolean>
  }

const gap = 48

/** 带输入框的弹窗 */
const BasePrompt: React.FC<BasePromptProps> = (props) => {
  const { title, placeholder, maxlength, beforeClose, unit, name, type } = props
  const [isOpen, setIsOpen] = useState(props.show)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<{
    focus(): void
  } | null>(null)

  const [value, setValue] = useState(props.value)

  async function handlePromptClose(
    fn: (e?: any) => void,
    action: PromptAction
    // promptValue?: string | number
  ) {
    if (beforeClose) {
      if (action === "confirm") {
        setLoading(true)
      }
      if (beforeClose instanceof Function) {
        try {
          const res = await beforeClose(action, value)
          res && fn()
        } catch (error) {
        } finally {
          setLoading(false)
        }
      } else {
        console.error("请设置正确的`beforeClose`函数")
      }
    } else {
      fn()
    }
  }

  useEffect(() => {
    setIsOpen(props.show)

    if (props.show) {
      setValue(props.value)
      // inputRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])

  return (
    <>
      <Dialog
        loading={loading}
        showCancelButton
        open={isOpen}
        catchMove
        onClose={() => {
          handlePromptClose(() => {
            setIsOpen(false)
            // props.onCancel && props.onCancel(false)
            props.onClose?.(false)
          }, "cancel")
        }}
        // @ts-expect-error
        style={`
          --dialog-header-isolated-padding: 48rpx 0 32rpx;
        `}
        className={css`
          z-index: ${1000 + 2};
          .taroify {
            &-dialog {
              &__header {
                height: 112px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 24px;
                font-size: 32px;
                font-weight: 500;
              }
              &__message {
                padding: 0 !important;
              }
              &__footer {
                padding: 0 48px 48px;
                ::after {
                  display: none;
                }
                &--rounded {
                  .taroify-button {
                    height: 80px !important;
                    height: 80px !important;
                    border-radius: 40px;
                    padding-left: ${gap / 2}px;
                    padding-right: ${gap / 2}px;
                    width: 100%;
                  }
                }
              }
            }
          }
        `}
      >
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Content>
          <View
            style={`
              --propmt-input-font-size: ${unit ? px(44) : px(32)};
              --prompt-input-font-weight: ${unit ? 500 : 400}};
              --propmt-input-text-align: ${unit ? "center" : "left"};
            `}
            className={css`
              box-sizing: "border-box";
              padding: 0 120px 16px;
              margin: 32px 0 24px;
              .taroify-cell {
                padding: 0;
                overflow: visible;
                .taroify-input {
                  &__clear {
                    font-size: 44px;
                    margin-right: 0;
                  }
                }
                &__title {
                  margin: 0;
                  flex: none;
                  width: auto;
                }
                &__value {
                  height: 62px;
                  margin: 0 8px;
                  position: relative;
                  &::after {
                    content: "";
                    display: block;
                    height: 0;
                    position: absolute;
                    left: 0;
                    width: 100%;
                    bottom: -4px;
                    border-top: 1px solid #222;
                    transform: scaleY(0.25);
                  }
                }
                input {
                  /* color: ${Theme.themeYellow}; */
                  font-size: var(--propmt-input-font-size, 32px);
                  font-weight: var(--propmt-input-font-weight, 400);
                  color: #222;
                  text-align: var(--propmt-input-text-align, left);
                  line-height: 52px;
                  /* font-weight: 500; */
                  height: 100%;
                }
              }
              .taroify-form {
                &-control {
                  height: 100%;
                }
                &-item {
                  &__right-icon {
                    padding: 0;
                    width: 40px;
                    color: ${Theme.textSeond};
                    text-align: left;
                  }
                }
              }
            `}
          >
            <Field bordered={false} align="center" rightIcon={<>{unit}</>}>
              {props.show && (
                <Input
                  ref={inputRef}
                  value={value}
                  placeholder={placeholder}
                  type={type}
                  focus
                  autoFocus
                  maxlength={maxlength}
                  onInput={(e) => {
                    // console.log("e", e)
                    setValue(`${e.detail.value}`)
                    return `${e.detail.value}`
                  }}
                  // onFocus={(e) => setKeyBoxHeigth(e.detail.height)}
                  // onBlur={() => setKeyBoxHeigth(0)}
                  // adjustPosition={false}
                  clearable={props.clearable}
                  align={props.align}
                />
              )}
            </Field>
          </View>
          <View
            className={css`
              padding: 48px 48px;
            `}
          >
            <View
              className={css`
                display: flex;
                margin-left: -24px;
                margin-right: -24px;
                .taroify-button {
                  &__content {
                    ::before {
                      display: none;
                    }
                  }
                }
              `}
            >
              <View className={flexItem}>
                <Button
                  block
                  shape="round"
                  className={css`
                    color: #999;
                    background: #f8f8f8;
                    border-color: #f8f8f8;
                  `}
                  onClick={() => {
                    setIsOpen(false)
                    // props.onCancel && props.onCancel(false)
                    props.onClose?.(false)
                  }}
                >
                  取消
                </Button>
              </View>
              <View className={flexItem}>
                <Button
                  block
                  shape="round"
                  color="primary"
                  loading={loading}
                  className={css`
                    color: #222;
                    background: ${Theme.themeYellow};
                    border-color: ${Theme.themeYellow};
                    /* background: ${Theme.themeColor};
                    border-color: ${Theme.themeColor}; */
                  `}
                  onClick={async () => {
                    // setIsOpen(false)
                    if (props.shouldValidate) {
                      if (value?.trim()) {
                        handlePromptClose(() => {
                          setIsOpen(false)
                          props.onConfirm?.(value)
                          props.onClose?.(false)
                        }, "confirm")
                      } else {
                        showToast({
                          title: `${name ?? "输入值"}不能为空`,
                          icon: "none"
                        })
                        inputRef.current?.focus()
                      }
                    } else {
                      handlePromptClose(
                        () => {
                          setIsOpen(false)
                          props.onConfirm?.(value)
                          props.onClose?.(false)
                        },
                        "confirm"
                        // value
                      )
                    }
                  }}
                >
                  确定
                </Button>
              </View>
            </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

BasePrompt.defaultProps = {
  placeholder: "",
  maxlength: 140,
  shouldValidate: true
}

export default BasePrompt
