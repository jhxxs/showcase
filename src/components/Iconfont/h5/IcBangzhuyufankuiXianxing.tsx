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

const IcBangzhuyufankuiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M773.1 77.1H250.9c-70.6 0-128 57.4-128 128v613.8c0 70.6 57.4 128 128 128h522.2c70.6 0 128-57.4 128-128V205.1c0-70.6-57.4-128-128-128zm64 741.8c0 35.3-28.7 64-64 64H250.9c-35.3 0-64-28.7-64-64V205.1c0-35.3 28.7-64 64-64h522.2c35.3 0 64 28.7 64 64v613.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M695.1 342.7H328.9c-17.7 0-32 14.3-32 32s14.3 32 32 32h366.2c17.7 0 32-14.3 32-32s-14.3-32-32-32zM512 571.6H328.9c-17.7 0-32 14.3-32 32s14.3 32 32 32H512c17.7 0 32-14.3 32-32s-14.3-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcBangzhuyufankuiXianxing.defaultProps = {
  size: 18,
};

export default IcBangzhuyufankuiXianxing;
