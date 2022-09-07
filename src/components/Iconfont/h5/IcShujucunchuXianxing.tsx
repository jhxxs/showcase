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

const IcShujucunchuXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M861.7 252.2H793l-77.1-85c-30.3-33.5-73.4-52.5-118.5-52.5H193.7c-64.8 0-117.3 52.5-117.3 117.3v597.4c0 47.1 38.2 85.3 85.3 85.3h700c47.1 0 85.3-38.2 85.3-85.3V337.5c0-47.1-38.2-85.3-85.3-85.3zM140.4 232c0-29.5 23.9-53.3 53.3-53.3h403.7c27.1 0 52.9 11.5 71.1 31.5l38.1 42H140.4V232zM883 829.4c0 11.8-9.5 21.3-21.3 21.3h-700c-11.8 0-21.3-9.6-21.3-21.3V316.2h721.3c11.8 0 21.3 9.6 21.3 21.3v491.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M564.4 422.8c-29.2-29.2-76.4-29.2-105.6 0L343.5 538.2c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l95.8-95.8v231.9c0 17.7 14.3 32 32 32s32-14.3 32-32V497.4l86 86c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L564.4 422.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcShujucunchuXianxing.defaultProps = {
  size: 18,
};

export default IcShujucunchuXianxing;
