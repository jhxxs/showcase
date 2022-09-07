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

const IcXiangyoujiantouXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M18.9 36.8c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1L28 24 17.8 13.7c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l11.3 11.3c.6.6.6 1.5 0 2.1L19.9 36.4c-.3.3-.7.4-1 .4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcXiangyoujiantouXianxing.defaultProps = {
  size: 18,
};

export default IcXiangyoujiantouXianxing;
