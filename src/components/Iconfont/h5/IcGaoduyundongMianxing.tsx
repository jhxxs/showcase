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

const IcGaoduyundongMianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <circle
        fill={getIconColor(color, 0, 'currentColor')}
        cy="210.2"
        cx="790.5"
        r="101.8"
      />
      <path
        d="M967.7 336.9c-22.4-14.3-52-7.8-66.3 14.5l-4 6.3c-19.7 31.3-37.2 55.2-67.5 55.2h-.6c-11.9-.1-51-17.7-76-39.7s-66.7-65.8-96-89c-36.8-35.4-97.9-83.8-151.2-76.2-66.8 9.4-108.5 75.7-142 128.9l-11.5 18.2c-14.4 22.2-8.1 52 14.2 66.4 8.1 5.2 17.1 7.7 26.1 7.7 15.7 0 31.1-7.7 40.3-21.9l12.2-19.2c19.2-30.6 45.5-74.4 69.5-80.4 23.5-3 45.4 17.7 73 43.2-39.4 54.9-198 255.3-262 308.3-44.1 36.5-146.8 88.8-210.3 118.5-24 11.2-34.4 39.8-23.1 63.8 8.2 17.4 25.5 27.7 43.5 27.7 6.8 0 13.7-1.5 20.3-4.5 29.7-13.9 180-85.2 227-128 24.1-22 62.3-61.3 93.2-93.8.8.2 1.6.6 2.4.8 77 17.4 159.5 51.4 175.6 71.8-6.1 17.7-56.7 56.3-114 80.5-24.4 10.3-35.9 38.4-25.6 62.8 7.7 18.4 25.5 29.4 44.2 29.4 6.2 0 12.5-1.2 18.5-3.8 41-17.2 174.5-80.5 173.4-172.8-.6-52.7-53-91.3-115.1-118.6 29.5-46 64.1-98.5 82.3-126 38.1 27.3 75 41.6 110.1 42h1.7c85.6 0 128.1-67.5 148.6-100.1l3.6-5.7c14.4-22.4 7.9-52-14.5-66.3zM132.2 438.3h154.7c13.2 0 24-10.8 24-24s-10.8-24-24-24H132.2c-13.2 0-24 10.8-24 24s10.7 24 24 24z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M262.2 499.8c0-13.2-10.8-24-24-24H58.9c-13.2 0-24 10.8-24 24 0 13.3 10.8 24 24 24h179.3c13.2 0 24-10.8 24-24zm-122 85.5c0 13.2 10.8 24 24 24h154.7c13.2 0 24-10.8 24-24s-10.8-24-24-24H164.2c-13.3 0-24 10.7-24 24z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcGaoduyundongMianxing.defaultProps = {
  size: 18,
};

export default IcGaoduyundongMianxing;
