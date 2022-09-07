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

const IcLanyaduankaiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M579.9 289.1 371.5 80.7c-9.1-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6V443L163.1 289.1c-12.5-12.5-32.8-12.5-45.2 0-12.5 12.5-12.5 32.8 0 45.2l185.8 185.8-185.9 185.8c-12.5 12.5-12.5 32.8 0 45.2s32.8 12.5 45.2 0l153.8-153.8v339.6c0 12.9 7.8 24.6 19.8 29.6 4 1.6 8.1 2.4 12.2 2.4 8.3 0 16.5-3.2 22.6-9.4l208.4-208.4c12.5-12.5 12.5-32.8 0-45.2L394.1 520.1l185.8-185.8c12.5-12.5 12.5-32.7 0-45.2zM512 728.5 380.9 859.7V597.4L512 728.5zM380.9 442.9V180.6L512 311.7 380.9 442.9zM819 56c-109 0-197.3 88.3-197.3 197.3S710.1 450.7 819 450.7c109 0 197.3-88.3 197.3-197.3S928 56 819 56zm88.7 248.7c10.3 10.3 10.3 27 0 37.3-10.3 10.3-27 10.3-37.3 0L819 290.7l-51.4 51.4c-10.3 10.3-27 10.3-37.3 0-10.3-10.3-10.3-27 0-37.3l51.4-51.4-51.4-51.4c-10.3-10.3-10.3-27 0-37.3 10.3-10.3 27-10.3 37.3 0L819 216l51.4-51.4c10.3-10.3 27-10.3 37.3 0 10.3 10.3 10.3 27 0 37.3l-51.4 51.4 51.4 51.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcLanyaduankaiXianxing.defaultProps = {
  size: 18,
};

export default IcLanyaduankaiXianxing;
