/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';
import Icon from './h5';

export type IconNames = 'ic-guanyu-xianxing' | 'ic-qingduyundong-mianxing' | 'ic-zhongduyundong-mianxing' | 'ic-shujucunchu-xianxing' | 'ic-jingyin-xianxing' | 'ic-heshuitixing-xianxing' | 'ic-caozuoshuoming-xianxing' | 'ic-shuaxin-xianxing' | 'ic-buyundong-mianxing' | 'ic-lanyaduankai-xianxing' | 'ic-shanchu-xianxing' | 'ic-zhishi-xianxing' | 'ic-zhuanhuan-xianxing' | 'ic-celiang-xianxing' | 'ic-shezhi-xianxing' | 'ic-xiaozhun-xianxing' | 'ic-tianjia-xianxing' | 'ic-wifiduankai-xianxing' | 'ic-copy' | 'ic-bangzhuyufankui-xianxing' | 'ic-dakaqiandao-xianxing' | 'ic-tianjiayinshuiliang-xianxing' | 'ic-fanhui-xianxing' | 'lunyi' | 'ic-gaoduyundong-mianxing' | 'ic-mubiao-xianxing' | 'jiazai' | 'ic-xiangyoujiantou-xianxing' | 'shibaide' | 'chenggongde' | 'qingchu' | 'biyan' | 'zhengyan' | 'ic-tuichudenglu-xianxing' | 'ic-tangfen-xianxing' | 'ic-shuifen-xianxing' | 'ic-guanbi-xianxing' | 'check';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  return <Icon name={name} size={parseFloat(Taro.pxTransform(size, 750))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
