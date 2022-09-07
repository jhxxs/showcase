/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IcHeshuitixingXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M871.5 778.4h-46.2v-333c0-162.2-123.3-295.7-281.3-311.7V103c0-17.7-14.3-32-32-32s-32 14.3-32 32v30.7c-158 16-281.3 149.5-281.3 311.7v333h-46.2c-17.7 0-32 14.3-32 32s14.3 32 32 32h223.7C379.5 914.5 439 972 512 972c72.9 0 132.4-57.4 135.8-129.6h223.8c17.7 0 32-14.3 32-32-.1-17.7-14.4-32-32.1-32zM512 908c-37.6 0-68.4-28.8-71.6-65.6h143.3c-3.3 36.7-34.1 65.6-71.7 65.6zm249.3-129.6H262.7v-333c0-137.5 111.3-249 248.7-249.3h1.4c137.4.4 248.7 111.8 248.7 249.3v333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcHeshuitixingXianxing.defaultProps = {
  size: 18,
};

export default IcHeshuitixingXianxing;
