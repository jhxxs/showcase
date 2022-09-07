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

const Chenggongde: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 32c265.104 0 480 214.896 480 480 0 265.104-214.896 480-480 480-265.104 0-480-214.896-480-480C32 246.896 246.896 32 512 32zm238.4 321.6a32 32 0 0 0-45.264 0L456 602.72 338.768 485.488a32 32 0 1 0-45.264 45.264l135.76 135.76a31.22 31.22 0 0 0 3.696 3.168l.672.704a32 32 0 0 0 45.248 0l271.52-271.52a32 32 0 0 0 0-45.248z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Chenggongde.defaultProps = {
  size: 18,
};

export default Chenggongde;
