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

const Qingchu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        fill={getIconColor(color, 0, '#E8E9EA')}
        d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512Z"
      />
      <path
        fill={getIconColor(color, 1, '#323647')}
        d="m511.68 470.96 142.512-142.784a29.136 29.136 0 0 1 40.544.08c11.232 10.976 11.488 28.832.592 40.112l-143.04 143.296 143.04 143.296c7.456 7.232 10.4 17.888 7.68 27.856a28.768 28.768 0 0 1-20.768 20.288 29.12 29.12 0 0 1-28.048-7.936L511.68 552.384 369.168 695.168a29.136 29.136 0 0 1-40.56-.08 28.384 28.384 0 0 1-.576-40.128l143.04-143.296-143.056-143.296a28.384 28.384 0 0 1 .576-40.112 29.136 29.136 0 0 1 40.56-.08L511.68 470.96z"
      />
    </svg>
  );
};

Qingchu.defaultProps = {
  size: 18,
};

export default Qingchu;
