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

const IcShuaxinXianxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M857.9 606.2c-5.3 0-10.7-1.3-15.6-4-12.5-7-18.8-21.4-15.6-35.3 5.9-24.9 8.9-50.8 8.9-76.8 0-184.4-150-334.5-334.5-334.5-124.8 0-238.4 68.7-296.4 179.4-8.2 15.7-27.5 21.7-43.2 13.5-15.7-8.2-21.7-27.5-13.5-43.2C217.1 173.5 352.4 91.6 501.1 91.6c218.8 0 397 177.3 398.5 395.7l30.1-30.1c12.5-12.5 32.8-12.5 45.2 0s12.5 32.8 0 45.2l-94.5 94.4c-6.1 6.2-14.2 9.4-22.5 9.4zm-335 326.2c-218.8 0-397-177.2-398.5-395.7l-30.1 30.1c-12.5 12.5-32.7 12.6-45.2 0-12.5-12.5-12.5-32.8 0-45.3l94.4-94.4c10.1-10.2 25.7-12.3 38.2-5.3 12.5 6.9 18.9 21.3 15.6 35.3-5.9 25.1-8.9 50.9-8.9 76.9 0 184.5 150.1 334.5 334.5 334.5 124.8 0 238.4-68.8 296.4-179.4 8.2-15.6 27.5-21.7 43.2-13.5 15.6 8.2 21.7 27.5 13.5 43.2-69.1 131.7-204.4 213.6-353.1 213.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IcShuaxinXianxing.defaultProps = {
  size: 18,
};

export default IcShuaxinXianxing;
