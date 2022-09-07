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

const IcCaozuoshuomingXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 55.1c-251.9 0-456.9 205-456.9 456.9 0 252 205 456.9 456.9 456.9 252 0 456.9-205 456.9-456.9C968.9 260.1 764 55.1 512 55.1zm0 849.8c-216.6 0-392.9-176.2-392.9-392.9 0-216.6 176.3-392.9 392.9-392.9 216.7 0 392.9 176.3 392.9 392.9 0 216.7-176.2 392.9-392.9 392.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M511.7 649.1c-13.1 0-23.6 3.8-31.7 12.8-9.3 8.3-13.7 19.2-13.7 32.6 0 12.8 4.4 23.6 13.7 32.6 8.1 8.9 18.6 13.4 31.7 13.4 12.4 0 23.6-4.5 32.9-12.8 8.7-8.9 13.1-19.8 13.1-33.2 0-13.4-4.4-24.3-13.1-32.6-8.7-9-19.9-12.8-32.9-12.8zm6.1-339.2c-42.6 0-76.5 12.7-100.8 37.6-25 24.4-37.6 58.2-37.6 100.4v8.5h75.2v-8.5c0-22.5 4.4-39.8 13.2-51.5 9.2-12.9 25-19.5 46.8-19.5 17.5 0 30.6 4.5 39.9 13.8 9.1 9.6 13.5 22.4 13.5 39 0 12.2-4.2 23.5-12.7 34.4l-8.7 9.8c-17.5 15.5-31.1 28.6-41.6 40-11.1 12-18.5 22-22.7 30.4-7.5 15-11.3 33.9-11.3 55.9V618h75.7v-17.8c0-12.5 2.5-23.2 7.9-32.9 4.3-8.6 11.2-17.1 20.4-25.3 17.8-15.2 40.6-35.2 47.9-44.1 14.6-19.5 22-43.7 22-72 0-35.3-11.8-63.8-35.1-84.8-23.6-21-53.6-31.2-92-31.2z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcCaozuoshuomingXianxing.defaultProps = {
  size: 18,
};

export default IcCaozuoshuomingXianxing;
