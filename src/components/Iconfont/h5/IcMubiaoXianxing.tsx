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

const IcMubiaoXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M791.8 160.9h-74.4v-27.4c0-23.6-19.1-42.7-42.7-42.7H349.2c-23.6 0-42.7 19.1-42.7 42.7v27.4h-74.4c-64.7 0-117.3 52.6-117.3 117.3v559.6c0 64.7 52.6 117.3 117.3 117.3h559.6c64.7 0 117.3-52.6 117.3-117.3V278.2c.2-64.7-52.5-117.3-117.2-117.3zm-421.2-6.1h282.9V232H370.6v-77.2zm474.6 683c0 29.4-23.9 53.3-53.3 53.3H232.2c-29.4 0-53.3-23.9-53.3-53.3V278.2c0-29.4 23.9-53.3 53.3-53.3h74.4v28.5c0 23.6 19.1 42.7 42.7 42.7h325.5c23.6 0 42.7-19.1 42.7-42.7v-28.5h74.4c29.4 0 53.3 23.9 53.3 53.3v559.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M652.4 429.1 449.1 632.4l-74.2-74.2c-12.5-12.5-32.8-12.5-45.2 0s-12.5 32.8 0 45.2l96.8 96.8c6 6 14.1 9.4 22.6 9.4 8.5 0 16.6-3.4 22.6-9.4l225.9-225.9c12.5-12.5 12.5-32.8 0-45.2s-32.7-12.5-45.2 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcMubiaoXianxing.defaultProps = {
  size: 18,
};

export default IcMubiaoXianxing;
