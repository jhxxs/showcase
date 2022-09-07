import { Theme } from "@/constants/theme"
import { px } from "@/utils"
import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import clsx from "clsx"
import { useCallback, useMemo, useState } from "react"

type TabsProps<T> = {
  defaultAtive?: number
  tabs?: T[]
  onChange?: (index: number, item: T) => void
}

const Tabs: React.FC<TabsProps<{ label: string; value: any }>> = ({
  defaultAtive = 0,
  tabs = [],
  onChange
}) => {
  const [active, setActive] = useState(defaultAtive)

  const handleChange = useCallback(
    (index: number, item: typeof tabs[number]) => {
      setActive(index)
      // if (active != defaultAtive) {
      onChange?.(index, item)
      // }
    },
    [onChange]
  )

  /** 左右间距 */
  const gap = 6

  /** 滑块宽度百分比 */
  const sliderWidth = useMemo(() => `${100 / tabs.length}%`, [tabs.length])
  /** 滑块left */
  const sliderLeft = useMemo(() => {
    return active > 0
      ? `calc(${(100 / tabs.length) * active}% + ${px(gap)})`
      : px(gap)
  }, [active, tabs.length])

  return (
    <View className={css``}>
      <View
        style={`
          --slider-width: ${sliderWidth};
          --slider-left: ${sliderLeft};
         `}
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: ${gap}px;
          border-radius: 39px;
          height: 64px;
          overflow: hidden;
          background: #ffffff;
          position: relative;
          box-sizing: content-box;
          box-shadow: 0px 6px 18px 0px rgba(165, 165, 165, 0.16);
        `}
      >
        <View
          className={css`
            width: calc(100% - ${gap * 2}px);
            height: calc(100% - ${gap * 2}px);
            position: absolute;
            left: 0;
            top: ${gap}px;
            ::after {
              content: "";
              display: block;
              position: absolute;
              width: var(--slider-width);
              background: #9dccb9;
              height: 100%;
              border-radius: 32px;
              left: var(--slider-left, ${gap}px);
              will-change: left;
              /* transition: all 0.2s; */
              transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
            }
          `}
        />
        {tabs.map((v, index) => (
          <View
            onClick={() => handleChange(index, v)}
            className={clsx(
              css`
                color: #999;
                flex: 1;
                background: transparent;
                position: relative;
                height: 100%;
                font-size: 28px;
                font-weight: 400;
                transition: all 0.5s;
              `,
              active == index
                ? css`
                    /* color: #2d89ff; */
                    /* background: red; */
                    color: #fff;
                    font-weight: 500;
                  `
                : ""
            )}
          >
            <View
              className={css`
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 2;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              {v.label}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
export default Tabs
