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

const Zhengyan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M660.16 424.384a58.24 58.24 0 1 1-116.48 0c0-32.256 26.24-58.496 58.496-58.496 4.032 0 7.68 1.536 11.648 2.048a179.2 179.2 0 0 0-103.36-33.28c-99.84 0-180.544 81.728-180.544 182.592 0 100.352 80.704 182.016 180.544 182.016 99.84 0 180.608-81.792 180.608-182.016 0-38.848-12.672-75.136-33.344-104.32.896 3.84 2.304 7.488 2.432 11.52zm351.04 75.2C926.976 345.216 728.32 189.44 510.4 189.44c-217.984-.128-416.64 155.776-500.352 310.144L0 517.12l10.048 17.6C93.76 688.512 292.48 844.8 510.336 844.8c217.792 0 416.576-156.352 500.8-310.144l9.6-17.6-9.6-17.536zM510.4 772.352c-179.52 0-349.504-128.64-427.136-255.232C160.896 390.016 330.88 261.888 510.4 261.888S859.84 390.016 937.536 517.12C859.904 643.712 689.92 772.352 510.4 772.352z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Zhengyan.defaultProps = {
  size: 18,
};

export default Zhengyan;
