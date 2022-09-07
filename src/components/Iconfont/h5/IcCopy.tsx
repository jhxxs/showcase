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

const IcCopy: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M801 129.1H474.2c-70.6 0-128 57.4-128 128V584c0 70.6 57.4 128 128 128H801c70.6 0 128-57.4 128-128V257.1c0-70.6-57.4-128-128-128zM865 584c0 35.3-28.7 64-64 64H474.2c-35.3 0-64-28.7-64-64V257.1c0-35.3 28.7-64 64-64H801c35.3 0 64 28.7 64 64V584z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M702.5 763.3c-17.7 0-32 15.8-32 33.5 0 29.4-23.9 53.3-53.3 53.3H256.9c-29.4 0-53.3-23.9-53.3-53.3V436.4c0-29.4 23.9-53.3 53.3-53.3h4.7c17.7 0 32-14.3 32-32s-14.3-32-32-32h-4.7c-64.7 0-117.3 52.6-117.3 117.3v360.3c0 64.7 52.6 117.3 117.3 117.3h360.3c64.7 0 117.3-52.6 117.3-120.2 0-17.6-14.3-30.5-32-30.5z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcCopy.defaultProps = {
  size: 18,
};

export default IcCopy;
