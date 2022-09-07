import { setCssEnv, Theme } from "@/constants/theme"
import { css } from "@linaria/core"
import { Button } from "@taroify/core"
import { ButtonProps } from "@taroify/core/button"
import { View, ViewProps } from "@tarojs/components"
import { createSelectorQuery, nextTick } from "@tarojs/taro"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { style } from "../utils/style"

const buttonWrapper = css`
  padding: 20px 135px calc(20px + ${setCssEnv("bottom")});
  background: ${Theme.baseBg};
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
`

/** 页面带有底部保存按钮 */
const PageWithBottomButton: React.FC<
  {
    className?: string
    /** 底部点击 */
    onBottomClick?: () => void
    /** 底部按钮属性 */
    buttonProps?: ButtonProps
    /** 是否显示底部按钮 */
    showBottonBtn?: boolean
  } & Pick<ViewProps, "className" | "style">
> = (props) => {
  const {
    // btnText = "保存",
    className = "",
    buttonProps = {
      children: ""
    },
    showBottonBtn
  } = props

  const [height, setHeight] = useState(20)

  // 根据按钮区域实际渲染高度动态计算底部padding
  useEffect(() => {
    if (showBottonBtn) {
      setTimeout(() => {
        nextTick(() => {
          createSelectorQuery()
            .select(`.${buttonWrapper}`)
            .boundingClientRect((res) => {
              if (res) {
                setHeight(res.height)
              }
            })
            .exec()
        })
      }, 300)
    }
  }, [showBottonBtn])

  const customStyle = style(props.style as any)

  return (
    <View
      style={`
      ${
        props.showBottonBtn ? `--pwbb-padding-bottom: ${height}px;` : ""
      };${customStyle}
    `}
      className={clsx(
        css`
          padding-bottom: var(--pwbb-padding-bottom, 20px);
        `,
        className
      )}
    >
      {props.children}
      {props.showBottonBtn && (
        <View className={buttonWrapper}>
          <Button color="danger" block {...buttonProps}>
            {buttonProps?.children && buttonProps.children}
          </Button>
        </View>
      )}
    </View>
  )
}

PageWithBottomButton.defaultProps = {
  showBottonBtn: true,
  className: "",
  style: ""
}
export default PageWithBottomButton
