import defaultHead from "@/assets/images/me_avatar@2x.png"
import { Theme } from "@/constants/theme"
import { accesstokenAtom, userDataAtom } from "@/jotai"
import { Image } from "@taroify/core"
import { css } from "@linaria/core"
import { ITouchEvent, View } from "@tarojs/components"
import { useAtom, useAtomValue } from "jotai"
import { styled } from "linaria/react"
import { useEffect } from "react"
import { px } from "@/utils"
import clsx from "clsx"
import { appService } from "@/service/BaseAxiosInstance"

type AvatarJustify = "flex-end"

const AvatarWrapper = styled(View as any)<{
  justify?: AvatarJustify
  onClick?: (event: ITouchEvent) => void
}>`
  display: flex;
  align-items: center;
  color: ${Theme.textFirst};
  justify-content: ${(p) => (p.justify ? p.justify : "initial")};
  color: ${Theme.textFirst};
  min-width: 0;
`

/** 用户头像，可以显示名称 */
const UserAvatar: React.FC<
  StyledProps<{
    /** 头像地址 */
    icon?: string
    /** 头像大小 */
    size?: number
    /** 是否显示昵称 */
    showName?: boolean
    username?: string
    /** 是否显示电话号码 */
    showMobile?: boolean
    /** 头像对齐 */
    avatarJustify?: "flex-end"
  }>
> = (props) => {
  const { size = 48 } = props
  const [userData, setUserData] = useAtom(userDataAtom)
  const accessToken = useAtomValue(accesstokenAtom)

  useEffect(() => {
    if (!Object.keys(userData).length && accessToken) {
      // UpdateUserDate()
      appService.user
        // @ts-expect-error
        .getUser()
        .then(({ data }) => setUserData((s) => ({ ...s, ...(data || {}) })))
    }
    return () => {}
  }, [accessToken, setUserData, userData])

  return (
    <AvatarWrapper justify={props.avatarJustify} onClick={props.onClick}>
      <Image
        src={props.icon || userData.icon || defaultHead}
        shape="circle"
        lazyLoad
        style={`
          --size: ${px(size || 0)}
        `}
        className={css`
          display: flex;
          align-items: center;
          /* flex: 1; */
          flex-shrink: 0;
          height: var(--size);
          width: var(--size);
        `}
      />
      {props.showName && (
        <View
          className={clsx(
            css`
              margin-left: 16px;
            `,
            props.className
          )}
        >
          <View className="name">
            <Theme.UnilineText>
              {props.username || userData.nickname}
            </Theme.UnilineText>
          </View>
          {props.showMobile && userData.username && (
            <View
              className={css`
                font-size: 24px;
                line-height: 34px;
                opacity: 0.57;
                margin-top: 4px;
              `}
            >
              {userData.username}
            </View>
          )}
        </View>
      )}
    </AvatarWrapper>
  )
}

UserAvatar.defaultProps = {
  showName: true,
  showMobile: false
}

export default UserAvatar
