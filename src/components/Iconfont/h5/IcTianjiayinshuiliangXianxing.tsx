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

const IcTianjiayinshuiliangXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M24 10.4c-1.3 0-2.4 1.1-2.4 2.4v8.8h-8.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h8.8v8.8c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4v-8.8h8.8c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4h-8.8v-8.8c0-1.3-1.1-2.4-2.4-2.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcTianjiayinshuiliangXianxing.defaultProps = {
  size: 18,
};

export default IcTianjiayinshuiliangXianxing;
