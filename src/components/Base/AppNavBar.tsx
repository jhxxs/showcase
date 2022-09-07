import { RouterName } from "@/app.config"
import { Theme } from "@/constants/theme"
import { getSystem } from "@/hook"
import { navHeightAtom, systemAtom } from "@/jotai"
import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import { navigateBack, setNavigationBarColor, switchTab } from "@tarojs/taro"
import { useAtom, useAtomValue } from "jotai"
import { useEffect } from "react"
import IconFont from "../Iconfont"

export type AppNavBarProps = {
  title?: string
  customRight?: any
  customLeft?: any
  customMiddle?: JSX.Element
  bgColor?: StringInclude<"transparent">
  mode?: "dark" | "light"
  /** 返回上一页拦截函数 */
  beforBack?: () => Promise<void>
  /** 是否显示左边 */
  hideLeft?: boolean
  /** 是否占位 */
  showPlaceholder?: boolean
  /** 返回后跳转的页面 */
  backPage?: string
}

/** 自定义导航栏 */
const AppNavBar: React.FC<AppNavBarProps> = (props) => {
  const { mode = "light" } = props

  const [{ navBarHeight, navPaddingR, statusBarHeight }, setSystem] =
    useAtom(systemAtom)
  const customNavHeight = useAtomValue(navHeightAtom)

  /** 动态修改状态栏颜色 */
  useEffect(() => {
    if (mode == "dark") {
      setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#000000"
      })
    } else {
      setNavigationBarColor({
        frontColor: "#000000",
        backgroundColor: Theme.baseBg
      })
    }
    return () => {}
  }, [mode])

  useEffect(() => {
    setSystem(getSystem())

    return () => {
      // setSystem(getSystem())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <View
        className={css`
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          color: #fff;
          z-index: 99;
          width: 100%;
          box-sizing: border-box;
        `}
        style={{
          height: customNavHeight,
          paddingTop: statusBarHeight,
          paddingRight: navPaddingR,
          backgroundColor: (props.bgColor as string) || "#fff",
          paddingLeft: props.hideLeft ? navPaddingR : 0
        }}
      >
        <View
          style={{
            height: navBarHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {!props.hideLeft && (
            <View
              className={css`
                /* width: 112px; */
                display: flex;
                align-items: center;
                height: 100%;
              `}
            >
              {props.customLeft}
              {!props.customLeft && (
                <View
                  className={css`
                    padding: 0 32px;
                    font-size: 48px;
                  `}
                  onClick={async () => {
                    try {
                      if (props.beforBack) {
                        await props.beforBack()
                      }
                      await navigateBack()
                    } catch (error) {
                      switchTab({
                        url: `/${props.backPage || RouterName.TAB_HOME}`
                      })
                    }
                  }}
                >
                  <IconFont
                    name="ic-fanhui-xianxing"
                    size={48}
                    color={mode == "light" ? "#000" : "#fff"}
                  />
                </View>
              )}
            </View>
          )}
          <View
            className={css`
              flex: 1;
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 500;
              padding: 0 16px;
            `}
            style={{
              color: mode == "light" ? "#000" : "#fff",
              fontSize: 16
            }}
          >
            {props.customMiddle ? props.customMiddle : props.title || ""}
          </View>
        </View>
      </View>
      {props.showPlaceholder && (
        <View
          className={css`
            width: 100%;
          `}
          style={{
            height: customNavHeight
          }}
        />
      )}
    </>
  )
}

export default AppNavBar

AppNavBar.defaultProps = {
  bgColor: "transparent"
}
