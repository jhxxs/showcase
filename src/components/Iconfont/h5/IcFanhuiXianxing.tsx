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

const IcFanhuiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M31.6 8.6 15.5 24l16.1 15.4c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2 0L12.4 25.1c-.3-.3-.4-.7-.4-1.1 0-.4.1-.8.4-1.1L29.5 6.4c.6-.6 1.5-.6 2 0 .6.6.6 1.6.1 2.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcFanhuiXianxing.defaultProps = {
  size: 18,
};

export default IcFanhuiXianxing;
