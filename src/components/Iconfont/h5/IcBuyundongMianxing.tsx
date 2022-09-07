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

const IcBuyundongMianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 226.1c56.2 0 101.8-45.6 101.8-101.8C613.8 68 568.2 22.5 512 22.5S410.2 68 410.2 124.3c0 56.2 45.6 101.8 101.8 101.8zm256.1 338c-1.3-3.8-32.3-94-58.9-140.9-25.4-44.7-65.7-116-102.9-140.2-22-14.3-56.1-24-94.3-24s-72.3 9.7-94.3 24c-37.3 24.2-77.5 95.5-102.9 140.2-26.6 46.9-57.6 137.1-58.9 140.9-8.5 24.8 4.8 51.8 29.6 60.3 5.1 1.7 10.3 2.6 15.4 2.6 19.7 0 38.2-12.4 45-32.1 8.1-23.7 33.2-92.2 51.6-124.7 1-1.8 2.2-3.8 3.3-5.7 6 80.4 15.3 160.1 14.8 183l-34 309.5c-2.8 26.1 16 49.5 42.1 52.4 1.7.2 3.5.3 5.2.3 23.9 0 44.5-18 47.2-42.3L511 648.5h2l34.9 318.8c2.7 24.3 23.3 42.3 47.2 42.3 1.7 0 3.5-.1 5.2-.3 26.1-2.9 44.9-26.3 42.1-52.4l-33.9-309.5c-.5-22.9 8.8-102.7 14.8-183 1.1 2 2.3 3.9 3.3 5.7 18.4 32.5 43.5 101 51.6 124.7 6.8 19.7 25.2 32.1 45 32.1 5.1 0 10.3-.8 15.4-2.6 24.7-8.3 38-35.4 29.5-60.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcBuyundongMianxing.defaultProps = {
  size: 18,
};

export default IcBuyundongMianxing;
