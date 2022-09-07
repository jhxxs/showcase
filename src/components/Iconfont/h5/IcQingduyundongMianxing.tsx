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

const IcQingduyundongMianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M514.1 226.1c56.2 0 101.8-45.6 101.8-101.8S570.3 22.5 514.1 22.5 412.3 68.1 412.3 124.3s45.6 101.8 101.8 101.8zm283.7 245.3c-29.2-12.9-135.3-147.7-177.6-185C582 252.5 437 248.8 387 296.8 347 335.1 258.9 420.6 235.4 503c-7.3 25.5 7.5 52.1 33 59.3 4.4 1.2 8.8 1.9 13.2 1.9 20.9 0 40.1-13.8 46.1-34.8 10.1-35.2 50-85 86.4-123.2-2.2 20.4-24.7 250.3-37.7 291.7-11.7 37.1-76.8 156.7-115.1 223.3-13.2 23-5.3 52.3 17.7 65.5 7.5 4.3 15.8 6.4 23.9 6.4 16.6 0 32.8-8.6 41.7-24.1 10.7-18.6 104.8-183.1 123.4-242.3 5.9-18.6 10.7-43 14.7-68.1l68.2 68.3c9.6 9.7 16.6 21.7 20.1 34.8l52.8 195.8c5.8 21.4 25.1 35.5 46.3 35.5 4.1 0 8.3-.5 12.5-1.7 25.6-6.9 40.8-33.2 33.9-58.8l-52.8-195.8c-7.9-29.3-23.4-56.2-44.9-77.7l-35.6-35.6c6.2-48.5 24.9-149.7 33.7-196.4 42.5 51.2 100.3 113.6 142.3 132.1 6.3 2.8 12.9 4.1 19.3 4.1 18.5 0 36-10.7 44-28.7 10.6-24.1-.4-52.5-24.7-63.1z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcQingduyundongMianxing.defaultProps = {
  size: 18,
};

export default IcQingduyundongMianxing;
