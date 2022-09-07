import { px } from "@/utils"
import { css } from "@linaria/core"
import { View } from "@tarojs/components"
import clsx from "clsx"
import { useMemo } from "react"

interface RowProps {
  gutter?: number
}

const Row: React.FC<StyledProps<RowProps>> = (props) => {
  const gap = useMemo(() => px((props.gutter ?? 0) / 2), [props.gutter])

  return (
    <View
      style={`
        --gap: ${gap};
        --gap-negative: -${gap};
      `}
      className={clsx(
        css`
          margin-left: var(--gap-negative);
          margin-right: var(--gap-negative);
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          /* justify-content: center; */
        `,
        props.className
      )}
    >
      {props.children}
    </View>
  )
}

interface ColProps {
  span?: number
}

const Col: React.FC<ColProps> = (props) => {
  const percent = useMemo(
    () => +((props.span ?? 24) / 24).toFixed(4) * 100 + "%",
    [props.span]
  )
  return (
    <View
      style={`
      --span: ${percent};
    `}
      className={css`
        width: var(--span);
        padding-left: var(--gap, 0);
        padding-right: var(--gap, 0);
      `}
    >
      {props.children}
    </View>
  )
}

export default {
  Row,
  Col
}
