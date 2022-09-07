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

const IcTianjiaXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 70.9C268.8 70.9 70.9 268.8 70.9 512S268.8 953.1 512 953.1 953.1 755.2 953.1 512 755.2 70.9 512 70.9zm0 827.3C299 898.2 125.8 725 125.8 512S299 125.8 512 125.8 898.2 299 898.2 512 725 898.2 512 898.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M722 484.6H539.4V302c0-15.1-12.3-27.4-27.4-27.4-15.2 0-27.4 12.3-27.4 27.4v182.6H302c-15.1 0-27.4 12.3-27.4 27.4s12.3 27.4 27.4 27.4h182.6V722c0 15.1 12.3 27.4 27.4 27.4 15.1 0 27.4-12.3 27.4-27.4V539.4H722c15.1 0 27.4-12.3 27.4-27.4s-12.2-27.4-27.4-27.4z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcTianjiaXianxing.defaultProps = {
  size: 18,
};

export default IcTianjiaXianxing;
