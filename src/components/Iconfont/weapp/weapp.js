Component({
  properties: {
    // ic-guanyu-xianxing | ic-qingduyundong-mianxing | ic-zhongduyundong-mianxing | ic-shujucunchu-xianxing | ic-jingyin-xianxing | ic-heshuitixing-xianxing | ic-caozuoshuoming-xianxing | ic-shuaxin-xianxing | ic-buyundong-mianxing | ic-lanyaduankai-xianxing | ic-shanchu-xianxing | ic-zhishi-xianxing | ic-zhuanhuan-xianxing | ic-celiang-xianxing | ic-shezhi-xianxing | ic-xiaozhun-xianxing | ic-tianjia-xianxing | ic-wifiduankai-xianxing | ic-copy | ic-bangzhuyufankui-xianxing | ic-dakaqiandao-xianxing | ic-tianjiayinshuiliang-xianxing | ic-fanhui-xianxing | lunyi | ic-gaoduyundong-mianxing | ic-mubiao-xianxing | jiazai | ic-xiangyoujiantou-xianxing | shibaide | chenggongde | qingchu | biyan | zhengyan | ic-tuichudenglu-xianxing | ic-tangfen-xianxing | ic-shuifen-xianxing | ic-guanbi-xianxing | check
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18 / 750 * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
