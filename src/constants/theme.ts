import { css } from "@linaria/core"
import { styled } from "@linaria/react"
import { Text, TextProps } from "@tarojs/components"

export const customPrefix = "wc"

/** 主题 */
export const Theme = {
  baseColor: "rgba(142, 151, 253, 1)",
  /** 主题色 */
  themeBrand: "#fad000",
  themeBrandRGB: "250, 208, 0",
  /** 页面背景色 */
  baseBg: "#fafafa",
  /** 一级字体颜色 */
  textFirst: "#222",
  /** 二级字体颜色 */
  textSeond: "#666",
  /** 三级字体颜色 */
  textThird: "#999",
  /** 基本边框 */
  borderBase: "#E8E9EA",
  /** 常用绿色 */
  green: "#2BA245",
  /* 边框颜色 */
  baseBorder: "#D8D8D8",
  /** 暗色面板背景 */
  darkPanelBg: "#1C213A",
  customTabbarHeight: 166,
  basePadding: 32,
  "safe-area-inset-bottom": "env(safe-area-inset-bottom)",
  baseButton: css`
    color: #f55757;
    font-size: 28px;
    height: 88px;
    line-height: 88px;
    border: none;
    border-radius: 44px;
    background-color: #f2f2f2;
  `,
  baseTransition: "150ms ease-in",
  /** 多行省略号组件 */
  UnilineText: styled(Text as React.FC)<{ line?: number } & TextProps>`
    -webkit-line-clamp: ${(p) => p.line!};
    /** 限制在一个块元素显示的文本的行数 */
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  baseHover: css`
    transform: scale(0.9);
    transition: transform 150ms ease-in;
  `,
  /** 禁用，禁止点击 */
  disableStyle: css`
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  `,
  /** 主题色`#fad000` */
  themeColor: "#fad000",
  /** 灰色 */
  gray: "#afafaf",
  /** 主题绿 */
  themeGreen: "#9dccb9",
  /** 主题黄 */
  themeYellow: "#ddff2b"
}

Theme.UnilineText.defaultProps = {
  line: 1
}

type Direction = "top" | "right" | "bottom" | "left"

export function setCssEnv(direction: Direction, declarationValue?: string) {
  return `env(safe-area-inset-${direction}, ${declarationValue || "40px"})`
}
