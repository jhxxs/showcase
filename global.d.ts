declare module "*.png"
declare module "*.gif"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"
declare module "*.css"
declare module "*.less"
declare module "*.scss"
declare module "*.sass"
declare module "*.styl"

declare module "react-native" {
  type StyleProp<T> = T
  type ViewStyle = import("@tarojs/components").ViewProps["className"]
}

type StyledProps<T = Record<string, any>> = T &
  Pick<import("@tarojs/components").ViewProps, "className" | "onClick">

type StringInclude<T extends string> = T | Omit<string, T>
