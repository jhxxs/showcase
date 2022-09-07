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

const IcGuanyuXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 56.8C260.6 56.8 56.8 260.6 56.8 512S260.6 967.2 512 967.2c251.4 0 455.2-203.8 455.2-455.2S763.4 56.8 512 56.8zm0 846.4C296 903.2 120.8 728 120.8 512S295.9 120.8 512 120.8c216 0 391.2 175.1 391.2 391.2 0 216-175.1 391.2-391.2 391.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M512 252.4c17.7 0 32 14.3 32 32v273.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V284.4c0-17.7 14.3-32 32-32zm0 509.9c25.1 0 45.5-20.4 45.5-45.5s-20.4-45.5-45.5-45.5-45.5 20.4-45.5 45.5c0 25.2 20.4 45.5 45.5 45.5z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcGuanyuXianxing.defaultProps = {
  size: 18,
};

export default IcGuanyuXianxing;
