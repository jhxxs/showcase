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

const IcZhongduyundongMianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M580.2 237.1c56.2 0 101.8-45.6 101.8-101.8C682 79 636.4 33.5 580.2 33.5S478.4 79 478.4 135.3c0 56.2 45.5 101.8 101.8 101.8zm294.7 154.6c-15-21.8-44.9-27.2-66.8-12.2-12.3 8.4-69 36.6-90 24.8s-38.1-56.4-74.8-99.7-157.1-56.7-223.7-30c-30.9 6.4-80.9 21.7-109.8 57.6-37.4 46.4-69.4 136.2-72.9 146.2-8.8 25 4.4 52.4 29.5 61.2 5.2 1.8 10.6 2.7 15.9 2.7 19.8 0 38.4-12.4 45.3-32.2 14.1-40.2 38.8-95.1 57.1-117.8 8.4-10.4 33.1-19.2 54.2-23.7 2.3 7-59.6 280.6-98.1 307.7-29.5 13.8-113.7 8.5-165.4 5.9-26.5-1.6-49 19-50.4 45.5s19 49 45.5 50.4c10 .5 36.6 1.7 68.3 1.7 46 0 102.6-2.5 134.6-13.1 38.1-12.6 67.7-61.4 89.1-113.4 27.3 28.4 95.8 101.3 117.3 132.3 14.9 21.3 43.7 114.2 61.8 188.1 5.4 21.9 25 36.5 46.6 36.5 3.8 0 7.7-.5 11.5-1.4 25.7-6.3 41.5-32.3 35.1-58.1-7-28.5-43.7-173.1-76.3-220-18.9-27.2-60.3-73-91.4-106.4 13.7-47.4 42.2-135.3 56.9-180.1 24.4 33.1 45.7 49.8 68.4 54.8 10.1 2.2 20.5 3.2 31 3.2 61.5 0 124.9-33.9 139.4-44 21.8-14.9 27.2-44.7 12.1-66.5z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcZhongduyundongMianxing.defaultProps = {
  size: 18,
};

export default IcZhongduyundongMianxing;
