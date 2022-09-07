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

const Shibaide: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 32c265.104 0 480 214.896 480 480 0 265.104-214.896 480-480 480-265.104 0-480-214.896-480-480C32 246.896 246.896 32 512 32zM382.512 330.72a36.624 36.624 0 1 0-51.792 51.792L460.208 512 330.72 641.488a36.624 36.624 0 1 0 51.792 51.792L512 563.792 641.488 693.28a36.624 36.624 0 1 0 51.792-51.792L563.792 512 693.28 382.512a36.624 36.624 0 1 0-51.792-51.792L512 460.208z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Shibaide.defaultProps = {
  size: 18,
};

export default Shibaide;
