import IconFont, { IconNames } from "@/components/Iconfont"
import { Theme } from "@/constants/theme"
import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import { vibrateShort } from "@tarojs/taro"
import clsx from "clsx"

export type ControllCardProps = StyledProps<{
  title?: string
  label?: string
  icon?: IconNames
  active?: boolean
  onClick?: () => void
  clickable?: boolean
  disabled?: boolean
}>

/** 控制按钮 */
const ControllCard: React.FC<ControllCardProps> = ({
  title,
  label,
  icon,
  active,
  className,
  onClick,
  disabled
}) => {
  return (
    <View
      style={`
      --controll-card-bg: ${active && !disabled ? "#e8f5f9" : "#fff"};
      --controll-card-border-color: ${
        active && !disabled ? Theme.themeColor : "#fff"
      };
      `}
      className={clsx(
        css`
          border-radius: 24px;
          height: 128px;
          padding: 0 32px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 4px 12px 0px rgba(165, 165, 165, 0.16);
          overflow: hidden;
          transition: all 0.1s linear;
        `,
        active && !disabled
          ? css`
              color: #222;
              background: linear-gradient(180deg, #e5f4f8 0%, #f1f8fb 100%);
            `
          : css`
              background: #fff;
              color: ${Theme.textSeond};
              :active {
                background: var(
                  --cell-active-color,
                  var(--active-color, var(--gray-2, #f2f3f5))
                );
              }
            `,
        disabled
          ? css`
              opacity: 0.35;
              pointer-events: none;
            `
          : "",
        className
      )}
      onClick={() => {
        // vibrateShort()
        onClick?.()
      }}
    >
      <View
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <View
          className={css`
            line-height: 38px;
            font-size: 32px;
          `}
        >
          {title}
        </View>
        {label != undefined && label != null && active && !disabled && (
          <View
            className={css`
              color: ${Theme.textSeond};
              line-height: 28px;
              margin-top: 4px;
              font-size: 24px;
            `}
          >
            （{label}）
          </View>
        )}
      </View>
      <View
        className={css`
          flex-shrink: 0;
        `}
      >
        {icon && (
          <IconFont
            name={icon}
            size={48}
            color={active && !disabled ? Theme.textFirst : Theme.textThird}
          />
        )}
      </View>
    </View>
  )
}

export default ControllCard
