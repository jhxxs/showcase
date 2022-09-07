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

const IcTangfenXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M26.9 5.2h.2L44 11c.5 0 .9.4 1 .9v.2l-.6 25.1c0 .4-.3.8-.7.9L22.3 45h-.6l-.2-.1-18-9.2c-.3-.2-.5-.4-.5-.8v-.2L3.9 10c0-.4.2-.7.5-.8l.1-.2c.1 0 .2-.1.3-.1H5l21.6-3.6c.1-.1.2-.1.3-.1zM43 13.3l-19.8 5.1-.2 24.2 19.4-6.2.6-23.1zM5.8 11.6 5 34.2l16 8.2.2-23.5-15.4-7.3zm35 6.4c.6-.1 1.1.4 1.2 1.1 0 .7-.2 1.3-.6 1.8l-.2.2-3.3 2.7c-2.2 1.8-4.2 3.7-6 5.9l-.8.9-1.9 2.5c-.4.6-1.2.9-1.9.9-.6-.1-1.1-.5-1.1-1.1v-.2l-.2-7.3c0-2 1.3-3.9 3.2-4.6l.4-.1L40.8 18zM26.7 7.3l-18.8 3 13.6 6.5c.1 0 .1-.1.2-.1l.2-.1 18.5-4.8-13.7-4.5z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcTangfenXianxing.defaultProps = {
  size: 18,
};

export default IcTangfenXianxing;
