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

const IcWifiduankaiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M269.1 410.5C226.8 433 187.2 461.8 152 497l60.3 60.3c35.5-35.5 76.4-63.3 120.3-83.3l-63.5-63.5zM512 271.2c150.9 0 291.7 57.7 396.5 162.5l60.3-60.3C848 252.5 685.7 185.9 512 185.9c-84.2 0-165.6 15.9-241 45.8l-80.4-80.4-45.2 45.2 593.8 593.8 45.2-45.2-74.9-74.9 44.5-44.5c-50.6-50.6-114.6-81.1-181.7-92.7l-95.8-95.8c120.7-9.8 245.2 30.2 335.2 120.3l60.3-60.3C746.9 372 566.5 327.1 401.7 362.4l-64-64c55.4-17.8 114-27.2 174.3-27.2zm-359.7 22.5c-34.6 23.1-67.1 49.8-97.1 79.7l60.3 60.3c30.1-30.1 63.1-56.3 98.5-78.3l-61.7-61.7zm250.8 250.8c-49 16-94.9 43-133 81.2l60.3 60.3c39.7-39.7 90.3-63.3 143.2-71l-70.5-70.5zM512 706c-42.7 0-77.2 34.6-77.2 77.2 0 42.7 34.6 77.2 77.2 77.2 42.7 0 77.2-34.6 77.2-77.2S554.7 706 512 706z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcWifiduankaiXianxing.defaultProps = {
  size: 18,
};

export default IcWifiduankaiXianxing;
