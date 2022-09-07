import { Theme } from "@/constants/theme"
import { px } from "@/utils"
import { hex2rgb } from "@/utils/tool"
import { css } from "@linaria/core"
import { View, ViewProps } from "@tarojs/components"
import clsx from "clsx"

export type BubbleProps = {
  /** 大小 */
  size?: number
  /** 气泡颜色，hex */
  color?: string
  /** 背景透明度 */
  opacity?: number
  /** 默认背景 */
  bg?: string
} & Pick<ViewProps, "className">

export const Bubble: React.FC<BubbleProps> = (props) => {
  const defaultSize = 54
  const boxShadow = `rgba(${hex2rgb(props.color ?? Theme.themeBrand).join(
    ","
  )}, ${props.opacity ?? 1})`

  return (
    <View
      style={{
        width: px(props.size ?? defaultSize),
        height: px(props.size ?? defaultSize),
        // @ts-expect-error
        "--bubble-shadow": boxShadow,
        "--bubble-bg": props.bg || "#f8f8f8"
      }}
      className={clsx(
        css`
          box-shadow: inset 0px 0px 22px 0px var(--bubble-shadow);
          opacity: 1;
          border-radius: 50%;
          position: absolute;
          z-index: 2;
          background: var(--bubble-bg);
        `,
        props.className
      )}
    />
  )
}

// export default Bubble
