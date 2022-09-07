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

const IcTuichudengluXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 48 48" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M24 1.2c12.6 0 22.8 10.2 22.8 22.8S36.6 46.8 24 46.8 1.2 36.6 1.2 24 11.4 1.2 24 1.2zm0 3C13 4.2 4.2 13 4.2 24S13 43.8 24 43.8 43.8 35 43.8 24 35 4.2 24 4.2zm5.3 7.2c1.5 0 2.8 1.3 2.9 2.9v2.8c0 .6-.4 1-1 1-.5 0-.9-.4-1-.8v-2.7c0-.6-.4-1-.8-1.1H14.9c-.4 0-.8.4-.9.9v19c0 .6.3 1 .8 1.1h14.6c.4 0 .8-.4.9-.9V31c0-.6.4-1 1-1 .5 0 .9.4 1 .8v2.6c0 1.6-1.2 3-2.7 3.1H14.9c-1.6 0-2.8-1.3-2.9-2.9v-19c0-1.6 1.1-3 2.7-3.1h14.6zm2.5 8 .1.1 3.8 3.8c.3.3.4.9.1 1.3l-.1.1-3.7 3.8c-.4.4-1 .4-1.4 0-.3-.3-.4-.9-.1-1.3l.1-.1 1.8-1.8h-11c-.6 0-1-.4-1-1 0-.5.4-.9.8-1h11.6L30.5 21c-.3-.3-.4-.9-.1-1.3l.1-.1c.4-.4.9-.5 1.3-.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcTuichudengluXianxing.defaultProps = {
  size: 18,
};

export default IcTuichudengluXianxing;
