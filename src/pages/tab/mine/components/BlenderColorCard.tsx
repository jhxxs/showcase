import { px } from "@/utils"
import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import clsx from "clsx"

type BlenderCircle = {
  size?: number
  bg?: string
} & ColorAngle &
  Partial<Record<"top" | "bottom" | "right" | "left", number>>

interface ColorAngle {
  angle?: number
}

export type BlenderColorCardProps = StyledProps<
  {
    /** 默认背景 */
    bg: string
    /** 左上角的圆 */
    topCircle?: BlenderCircle
    /** 右下角的圆 */
    bottomCircle?: BlenderCircle
  } & ColorAngle
>

/** 背景为渐变色，左上角一个圆，右下角一个圆 */
const BlenderColorCard: React.FC<BlenderColorCardProps> = ({
  bg = "#fff",
  topCircle,
  bottomCircle,
  children,
  className,
  angle = 180,
  onClick
}) => {
  return (
    <>
      <View
        style={`
          --card-bg: linear-gradient(${angle}deg, ${bg} 0%, #fff 100%);
          --top-bg: linear-gradient(${topCircle?.angle || 156}deg, ${
          topCircle?.bg || bg
        } 0%, #fff 100%);
          --bottom-bg: linear-gradient(${bottomCircle?.angle || 180}deg, ${
          bottomCircle?.bg || bg
        } 0%, #fff 100%);
          --top-size: ${px(topCircle?.size || 0)};
          --bottom-size: ${px(bottomCircle?.size || 0)};
          --top-left: ${px(topCircle?.left || 0)};
          --top-top: ${px(topCircle?.top || 0)};
          --bottom-right: ${px(bottomCircle?.right || 0)};
          --bottom-bottom: ${px(bottomCircle?.bottom || 0)};
          `}
        className={clsx(
          css`
            overflow: hidden;
            background: var(--card-bg);
            position: relative;
            ::before,
            ::after {
              display: block;
              content: "";
              position: absolute;
              border-radius: 50%;
              z-index: 1;
            }
            ::before {
              height: var(--top-size);
              width: var(--top-size);
              left: var(--top-left);
              top: var(--top-top);
              background: var(--top-bg);
            }
            ::after {
              height: var(--bottom-size);
              width: var(--bottom-size);
              right: var(--bottom-right);
              bottom: var(--bottom-bottom);
              background: var(--bottom-bg);
            }
          `,
          className
        )}
        onClick={onClick}
      >
        <View
          className={css`
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 2;
          `}
        >
          {children}
        </View>
      </View>
    </>
  )
}

export default BlenderColorCard
