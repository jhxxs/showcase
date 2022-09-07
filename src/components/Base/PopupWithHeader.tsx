import { Theme } from "@/constants/theme"
import { styled } from "@linaria/react"
import { Popup } from "@taroify/core"
import { View } from "@tarojs/components"
import { useBoolean } from "ahooks"
import clsx from "clsx"
import { forwardRef, useEffect, useImperativeHandle } from "react"
import IconFont from "../Iconfont"

/** 弹窗确定/取消按钮 */
const PopupBtn = styled(View as React.FC)<
  StyledProps<{
    primary?: boolean
    onClick?: () => void
  }>
>`
  height: 100%;
  line-height: 1.33;
  font-size: 28px;
  color: ${(p) => (p.primary ? Theme.themeBrand : Theme.textFirst)};
  font-weight: 500;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

/** 弹窗header */
const PopupHeader = styled(View as React.FC)<StyledProps>`
  height: 112px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  .header_text {
    font-size: 32px;
    line-height: 112px;
    flex: 1;
  }
`

export interface PopupWithHeaderRef {
  /** 打开弹窗 */
  showPopup: () => void
  /** 关闭弹窗 */
  hidePopup: () => void
}

/** 带确定/取消按钮的弹窗 */
const PopupWithHeader = forwardRef<
  PopupWithHeaderRef,
  React.PropsWithChildren<{
    /** 弹窗header内容 */
    name?: string
    /** 是否显示弹窗 */
    show?: boolean
    /** 是否显示确定/取消按钮 */
    showHeaderBtn?: boolean
    onCancel?: (e: false) => void
    cancelClass?: string
    onConfirm?: () => void
    confirmClass?: string
    className?: string
  }>
>((props, ref) => {
  const [popupVisible, { setTrue: showPopup, setFalse: hidePopup, set }] =
    useBoolean(props.show)

  useEffect(() => {
    set(!!props.show)
  }, [props.show, set])

  useImperativeHandle(ref, () => ({
    showPopup,
    hidePopup
  }))

  return (
    <>
      <Popup
        rounded
        placement="bottom"
        open={popupVisible}
        onClose={() => {
          hidePopup()
          props.onCancel?.(false)
        }}
        catchMove
        className={clsx(props.className)}
      >
        <PopupHeader className="header">
          {props.showHeaderBtn ? (
            <>
              <PopupBtn
                onClick={() => {
                  hidePopup()
                  props.onCancel?.(false)
                }}
              >
                取消
              </PopupBtn>
              <View className="header_text">{props.name}</View>
              <PopupBtn
                primary
                onClick={() => {
                  hidePopup()
                  props.onConfirm?.()
                }}
              >
                确定
              </PopupBtn>
            </>
          ) : (
            <>
              <Popup.Close>
                <View>
                  <IconFont
                    name="ic-guanbi-xianxing"
                    size={48}
                    color={Theme.textFirst}
                  />
                </View>
              </Popup.Close>
              <View className="header_text">{props.name}</View>
            </>
          )}
        </PopupHeader>

        <View catchMove>{props.children}</View>
      </Popup>
    </>
  )
})

PopupWithHeader.defaultProps = {
  name: "",
  showHeaderBtn: false
}

export default PopupWithHeader
