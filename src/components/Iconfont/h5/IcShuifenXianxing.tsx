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

const IcShuifenXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="m24 .7.8.9 1.4 1.6 1.3 1.5c.1.3.3.5.5.8L29.2 7c.2.2.4.5.6.7l1.1 1.4C37.6 17.8 41 24.7 41 29.7c0 9.7-7.6 17.5-17 17.5S7 39.3 7 29.7c0-5 3.4-11.9 10.1-20.6l1.1-1.4 1.2-1.5 1.2-1.5 1.3-1.5c.4-.5.9-1 1.4-1.6l.7-.9zm0 3.1-1.2 1.5-1.3 1.5-1.2 1.5-1.1 1.4c-.2.2-.4.5-.5.7l-1 1.4c-1.4 1.8-2.5 3.5-3.6 5.2l-.7 1.2c-3 4.6-4.4 8.5-4.4 11.5 0 8.6 6.7 15.5 15 15.5 6.1 0 11.3-3.7 13.6-9.1-2.5 3.6-6.8 6-11.6 6.1-7.7 0-14-6.1-14-13.7 0-6.8 5.9-4.4 11.9-1.1l.7.4.7.4c.2.1.5.3.7.4 4.8 2.7 9.9-2.3 12.4-2.6-.7-2.3-1.9-4.9-3.7-7.9l-.7-1.2c-1-1.6-2.2-3.4-3.6-5.2l-1-1.4c-.2-.2-.4-.5-.5-.7l-1.1-1.4-1.2-1.5-1.3-1.5L24 3.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcShuifenXianxing.defaultProps = {
  size: 18,
};

export default IcShuifenXianxing;
