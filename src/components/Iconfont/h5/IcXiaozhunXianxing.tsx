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

const IcXiaozhunXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M964.4 480h-49C899.8 282.1 741.9 124.2 544 108.6v-49c0-17.7-14.3-32-32-32s-32 14.3-32 32v49C282 124.1 124.1 282 108.6 480h-49c-17.7 0-32 14.3-32 32s14.3 32 32 32h49C124.1 741.9 282 899.9 480 915.4v49c0 17.7 14.3 32 32 32s32-14.3 32-32v-49C741.9 899.8 899.8 741.9 915.3 544h49c17.7 0 32-14.3 32-32 .1-17.7-14.3-32-31.9-32zm-159.6 64h46.3C836 706.6 706.6 836 544 851.1v-46.3c0-17.7-14.3-32-32-32s-32 14.3-32 32v46.3C317.4 836 188 706.6 172.8 544h46.3c17.7 0 32-14.3 32-32s-14.3-32-32-32h-46.3C188 317.4 317.4 188 480 172.9v46.3c0 17.7 14.3 32 32 32s32-14.3 32-32v-46.3C706.5 188 835.9 317.4 851.1 480h-46.3c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M512 389.6c-67.6 0-122.4 54.8-122.4 122.4S444.4 634.4 512 634.4c67.6 0 122.4-54.8 122.4-122.4S579.6 389.6 512 389.6zm0 180.8c-32.3 0-58.4-26.2-58.4-58.4 0-32.3 26.2-58.4 58.4-58.4 32.3 0 58.4 26.2 58.4 58.4 0 32.3-26.1 58.4-58.4 58.4z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IcXiaozhunXianxing.defaultProps = {
  size: 18,
};

export default IcXiaozhunXianxing;
