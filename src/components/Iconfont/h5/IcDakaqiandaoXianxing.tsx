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

const IcDakaqiandaoXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M21.1 33.6c-.6 0-1.2-.2-1.7-.7L11.5 25c-.9-.9-.9-2.5 0-3.4.9-.9 2.5-.9 3.4 0l6.2 6.2 14.1-14.1c.9-.9 2.5-.9 3.4 0s.9 2.5 0 3.4L22.7 32.9c-.4.4-1 .7-1.6.7z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcDakaqiandaoXianxing.defaultProps = {
  size: 18,
};

export default IcDakaqiandaoXianxing;
