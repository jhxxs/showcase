import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import clsx from "clsx"

const Battery: React.FC<
  StyledProps<{
    value?: number
  }>
> = ({ value, className }) => {
  const gap = 2

  return (
    <View
      className={clsx(
        css`
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
          /* height: 56px; */
        `,
        className
      )}
    >
      <View
        className={css`
          position: relative;
          border: 1px solid #989898;
          border-radius: 4px;
          height: 20px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: ${gap}px;
          /* transform: scale(5); */
          margin-right: 16px;
          ::after {
            display: block;
            position: absolute;
            content: "";
            height: 70%;
            width: 2px;
            border-radius: 1px;
            background: #989898;
            top: 0;
            bottom: 0;
            margin: auto 0;
            right: -7px;
          }
        `}
      >
        <View
          style={`
            --battery-width: ${value ?? 0}%;
          `}
          className={css`
            height: 100%;
            width: 100%;
            border-radius: 1px;
            overflow: hidden;
            position: relative;
            min-width: 0% !important;
            max-width: 100% !important;
            ::after {
              display: block;
              position: absolute;
              left: 0;
              content: "";
              width: var(--battery-width, 0%);
              height: 100%;
              background: #222;
              transition: all 0.2s;
            }
          `}
        />
      </View>
      <View
        className={css`
          font-size: 24px;
          width: 40px;
          color: #222;
        `}
      >
        {value ?? 0}%
      </View>
    </View>
  )
}

export default Battery
