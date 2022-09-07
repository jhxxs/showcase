import { TabList } from "@/app.config"
import { Theme } from "@/constants/theme"
import { css } from "@linaria/core"
import { styled } from "@linaria/react"
import { View } from "@tarojs/components"
import { switchTab } from "@tarojs/taro"
import clsx from "clsx"
import { memo } from "react"

const zFirst = 9
const zSecond = 10
const zThird = 11

interface TabbarCommonProps {
  active?: Boolean
}

const TabbarItem = styled(View as React.FC)<TabbarCommonProps>`
  color: ${(p) => (p.active ? Theme.themeBrand : Theme.textThird)};
  font-size: 24px;
  line-height: 1;
  margin-top: 16px;
`

const TabItems = memo((props: { active?: number }) => {
  const { active = 0 } = props
  return (
    <>
      {TabList.map((v, i) => (
        <>
          <View
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 16px 20px 0;
              transition: transform 120ms linear;
            `}
            onClick={() =>
              switchTab({
                url: `/${v.pagePath}`
              }).then(() => {
                console.log("current: ", v.pagePath)
              })
            }
          >
            <View>
              {/* <IconFont
                name={active == i ? v.img! : v.img!}
                size={48}
                color={active == i ? Theme.themeBrand : Theme.textThird}
              /> */}
            </View>
            <TabbarItem active={active == i}>{v.text}</TabbarItem>
          </View>

          {i == 1 && (
            <View
              className={css`
                width: 120px;
              `}
            />
          )}
        </>
      ))}
    </>
  )
})

type CustomTabbarProps = {
  active?: number
  /** 设备添加成功 */
  onDeviceAdded?: () => void
}

/**
 * 自定义底部导航栏
 *
 */
const CustomTabbar = memo((props: CustomTabbarProps) => {
  return (
    <>
      <View
        className={clsx(
          css`
            height: ${Theme.customTabbarHeight}px;
            width: 100%;
            z-index: ${zFirst};
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background-color: transparent;
            position: relative;
            padding: 0 30px 46px;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            left: 0;
            transition: all ${Theme.baseTransition};
            &::after {
              content: "";
              display: block;
              position: absolute;
              width: 100%;
              height: 90px;
              background: transparent;
              backdrop-filter: blur(5px);
              left: 0;
              bottom: 0;
            }
          `
        )}
      >
        {/* 中间添加按钮 */}
        <View
          className={css`
            z-index: ${zThird};
            width: 100%;
            height: 0;
            position: absolute;
            left: 0;
            /* top: 26px; */
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <View
            className={css`
              width: 80px;
              height: 80px;
              border-radius: 50%;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff;
              text-align: center;
              box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
            `}
            hoverClass={css`
              transform: translateY(2px);
            `}
          >
            {/* <IconFont name="jiahao" size={36} color={Theme.themeBrand} /> */}
          </View>
        </View>

        {/* 底部导航可点击子项 */}
        <View
          className={css`
            height: calc(${Theme.customTabbarHeight}px - 46px);
            width: calc(100% - 64px);
            padding: 0 32px 0;
            position: absolute;
            left: 32px;
            top: 0;
            bottom: 46px;
            z-index: ${zSecond};
            display: flex;
            justify-content: space-between;
            background: #fff;
            box-sizing: border-box;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
          `}
        >
          <TabItems active={props.active} />
        </View>
      </View>
    </>
  )
})

export default CustomTabbar
