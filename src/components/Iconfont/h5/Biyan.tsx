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

const Biyan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M954.368 369.216a34.688 34.688 0 0 0-6.4-44.992c-14.4-11.264-33.664-8.064-44.864 6.4-1.6 1.6-179.456 212.224-391.04 212.224-205.056 0-390.912-212.224-392.512-213.824a32.448 32.448 0 0 0-44.864-3.2 32.704 32.704 0 0 0-3.2 44.992c3.136 4.864 41.6 48.256 102.528 96.448l-81.728 85.248a31.168 31.168 0 0 0 1.6 44.992c3.2 6.4 11.2 9.664 19.2 9.664a31.36 31.36 0 0 0 22.4-9.664l88.128-91.648a623.14 623.14 0 0 0 145.792 75.52l-33.6 114.176a32.128 32.128 0 0 0 22.4 40.192h9.6a30.976 30.976 0 0 0 30.528-24.128l33.6-114.112c25.6 4.8 52.864 8.064 80.128 8.064 27.264 0 54.4-3.2 80.128-8.064l33.664 112.512c3.2 14.464 17.6 24.128 30.464 24.128 3.2 0 6.4 0 8-1.6a32.192 32.192 0 0 0 22.4-40.192l-33.6-112.512a620.864 620.864 0 0 0 145.792-75.584l86.528 90.048c6.4 6.4 14.4 9.664 22.4 9.664a31.36 31.36 0 0 0 22.4-9.664 32.64 32.64 0 0 0 1.664-44.992l-81.728-85.184c65.728-48.256 104.192-94.912 104.192-94.912z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Biyan.defaultProps = {
  size: 18,
};

export default Biyan;
