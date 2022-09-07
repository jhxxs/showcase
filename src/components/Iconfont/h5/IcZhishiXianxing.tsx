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

const IcZhishiXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M912.8 162.9H690.1c-75.4 0-141 40.2-178.1 100-37.1-59.8-102.8-100-178.1-100H111.2c-17.7 0-32 14.3-32 32v578.9c0 17.7 14.3 32 32 32h267.2c93.8 0 101.6 29.1 101.6 59 0 17.7 14.3 32 32 32s32-14.3 32-32c0-28.5 7.9-59 101.6-59h267.2c17.7 0 32-14.3 32-32V194.9c0-17.7-14.3-32-32-32zM480 759.5c-26-11.8-59.9-17.8-101.6-17.8H143.2V226.9h190.7c80.6 0 146.1 65.5 146.1 146.1v386.5zm400.8-17.7H645.6c-41.7 0-75.6 6-101.6 17.8V373c0-80.6 65.5-146.1 146.1-146.1h190.7v514.9z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcZhishiXianxing.defaultProps = {
  size: 18,
};

export default IcZhishiXianxing;
