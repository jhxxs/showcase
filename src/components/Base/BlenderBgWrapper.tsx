import { blenderBg } from "@/constants"
import { View } from "@tarojs/components"
import clsx from "clsx"
import { css } from "linaria"

/** 混合色背景外层容器 */
const BlenderBgWrapper: React.FC<
  StyledProps<{
    showBlender?: boolean
    bg?: string
  }>
> = (props) => {
  return (
    <>
      <View
        style={`
        --blender-bg: ${props.bg || `url(${blenderBg}) no-repeat`};
        `}
        className={clsx(
          css`
            height: 100vh;
            overflow-y: auto;
          `,
          props.showBlender
            ? css`
                background: var(--blender-bg);
                background-size: cover;
              `
            : "",
          props.className
        )}
      >
        {props.children}
      </View>
    </>
  )
}

export default BlenderBgWrapper
BlenderBgWrapper.defaultProps = {
  showBlender: true
}
