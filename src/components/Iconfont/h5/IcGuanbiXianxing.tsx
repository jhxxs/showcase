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

const IcGuanbiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M828.9 823.1c-12.5 12.5-32.8 12.5-45.3 0L517.8 557.3 246.1 828.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L472.5 512 200.9 240.3c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l271.7 271.7 265.9-265.9c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L563.1 512 829 777.9c12.4 12.5 12.4 32.7-.1 45.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcGuanbiXianxing.defaultProps = {
  size: 18,
};

export default IcGuanbiXianxing;
