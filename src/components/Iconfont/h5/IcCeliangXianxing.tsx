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

const IcCeliangXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M665.5 39.5h-307c-94.3 0-170.7 76.4-170.7 170.7v603.7c0 94.3 76.4 170.7 170.7 170.7h307c94.3 0 170.7-76.4 170.7-170.7V210.1c0-94.2-76.5-170.6-170.7-170.6zm106.7 774.4c0 58.9-47.8 106.7-106.7 106.7h-307c-58.9 0-106.7-47.8-106.7-106.7v-75c.6 0 1.2.1 1.9.1H451c17.7 0 32-14.3 32-32s-14.3-32-32-32H253.7c-.6 0-1.2 0-1.9.1v-66.8c.6 0 1.2.1 1.9.1H376c17.7 0 32-14.3 32-32s-14.3-32-32-32H253.7c-.6 0-1.2 0-1.9.1v-66.8H451c17.7 0 32-14.3 32-32s-14.3-32-32-32H253.7c-.6 0-1.2 0-1.9.1V347c.6 0 1.2.1 1.9.1H376c17.7 0 32-14.3 32-32s-14.3-32-32-32H253.7c-.6 0-1.2 0-1.9.1v-72.7c0-58.9 47.8-106.7 106.7-106.7h307c58.9 0 106.7 47.8 106.7 106.7v603.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcCeliangXianxing.defaultProps = {
  size: 18,
};

export default IcCeliangXianxing;
