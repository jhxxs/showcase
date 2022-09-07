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

const IcJingyinXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M558 202.2c0-8.9-10.3-13.9-17.3-8.3L325.3 366.1c-5.7 4.5-12.7 7-20 7H120.2c-5.9 0-10.7 4.8-10.7 10.7v256.3c0 5.9 4.8 10.7 10.7 10.7h185.1c7.3 0 14.3 2.5 20 7l215.4 172.3c7 5.6 17.3.6 17.3-8.3V202.2zm-57.3-58.3c48.9-39.1 121.3-4.3 121.3 58.3v619.7c0 62.6-72.4 97.4-121.3 58.3L294.1 714.8H120.2c-41.2 0-74.7-33.4-74.7-74.7V383.8c0-41.2 33.4-74.7 74.7-74.7h173.9l206.6-165.2zM957 371.7c12.5 12.5 12.5 32.8 0 45.3l-95 95 95 95c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-95-95-95 95c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l95-95-95-95c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l95 95 95-95c12.6-12.5 32.8-12.5 45.3 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcJingyinXianxing.defaultProps = {
  size: 18,
};

export default IcJingyinXianxing;
