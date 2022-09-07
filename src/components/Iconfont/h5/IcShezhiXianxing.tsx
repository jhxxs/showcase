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

const IcShezhiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M541.6 74.1c-18.4-10.3-40.9-10.3-59.3 0L139.4 267c-19 10.7-30.8 30.8-30.8 52.7v384.6c0 21.8 11.8 42 30.8 52.7l343 192.9c18.4 10.4 40.9 10.4 59.3 0l343-192.9c19-10.7 30.8-30.8 30.8-52.7V319.7c0-21.8-11.8-42-30.8-52.7L541.6 74.1zm-369 628.1V321.8L512 130.9l339.4 190.9v380.4L512 893.1 172.6 702.2zM427.9 512c0-46.4 37.6-84.1 84.1-84.1s84.1 37.6 84.1 84.1-37.6 84.1-84.1 84.1-84.1-37.7-84.1-84.1zM512 363.9c-81.8 0-148.1 66.3-148.1 148.1S430.2 660.1 512 660.1 660.1 593.8 660.1 512 593.8 363.9 512 363.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcShezhiXianxing.defaultProps = {
  size: 18,
};

export default IcShezhiXianxing;
