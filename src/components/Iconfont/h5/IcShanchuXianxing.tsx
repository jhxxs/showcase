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

const IcShanchuXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M883.7 243.1H713.3v-58.5l-.2-7.4c-3.8-63.7-56.7-114.1-121.3-114.1H432.2l-7.4.2c-63.7 3.8-114.1 56.7-114.1 121.3v58.5H140.4l-4.5.3c-16.2 2.2-28.6 16.1-28.6 32.8 0 18.3 14.8 33.1 33.1 33.1h52.2v530l.2 7.4c3.8 63.7 56.7 114.1 121.3 114.1H710l7.4-.2c63.7-3.8 114.1-56.7 114.1-121.3v-530h52.2l4.5-.3c16.2-2.2 28.6-16.1 28.6-32.8 0-18.3-14.8-33.1-33.1-33.1zM377 184.6l.3-5.6c2.8-27.9 26.4-49.6 55-49.6h159.5l5.7.3c27.9 2.8 49.6 26.4 49.6 55v58.5H377v-58.6zm388.2 654.8-.3 5.6c-2.8 27.9-26.4 49.6-55 49.6H314.1l-5.6-.3c-27.9-2.8-49.6-26.4-49.6-55v-530h506.4v530.1z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M413.2 798c18.3 0 33.1-14.8 33.1-33.1V602l-.3-4.5c-2.2-16.2-16.1-28.7-32.8-28.7-18.3 0-33.1 14.8-33.1 33.1v162.8l.3 4.5c2.2 16.3 16.1 28.8 32.8 28.8zm197.6 0c18.3 0 33.1-14.8 33.1-33.1V602l-.3-4.5c-2.2-16.2-16.1-28.7-32.8-28.7-18.3 0-33.1 14.8-33.1 33.1v162.8l.3 4.5c2.1 16.3 16 28.8 32.8 28.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcShanchuXianxing.defaultProps = {
  size: 18,
};

export default IcShanchuXianxing;
