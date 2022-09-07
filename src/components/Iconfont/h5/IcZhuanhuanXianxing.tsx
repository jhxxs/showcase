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

const IcZhuanhuanXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M146.3 361.1c-17.7 0-32-14.3-32-32s14.3-32 32-32h657.6l-86.6-92.4c-12.1-12.9-11.4-33.1 1.5-45.2 12.9-12.1 33.1-11.4 45.2 1.5l137.1 146.3c8.7 9.3 11.1 22.9 6 34.6-5.1 11.7-16.6 19.3-29.4 19.3H146.3zm731.4 301.8c17.7 0 32 14.3 32 32s-14.3 32-32 32H220.1l86.6 92.4c12.1 12.9 11.4 33.1-1.5 45.2-12.9 12.1-33.1 11.4-45.2-1.5L122.9 716.7c-8.7-9.3-11.1-22.9-6-34.6 5.1-11.7 16.6-19.3 29.4-19.3h731.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcZhuanhuanXianxing.defaultProps = {
  size: 18,
};

export default IcZhuanhuanXianxing;
