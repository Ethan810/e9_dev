export default {
  // entry: './src/pc4mobx/crm/single.js',
  // library: "weaCrm",
  entry: './src4js/demo/single.js',
  // library: "weaCrmReport",
  // entry: './src/pc4backstage/crm/single.js',
  // library: "weaCrmEngine",
  libraryTarget: "umd",
  disableCSSModules: true,
  env: {
    development: {
        extraBabelPlugins: [
            'transform-decorators-legacy',
            'dva-hmr',
            'transform-runtime',
            ["import", { libraryName: "antd-mobile", style: 'css' }]
        ]
    },
    production: {
        extraBabelPlugins: [
            'transform-decorators-legacy',
            'transform-runtime',
            ["import", { libraryName: "antd-mobile", style: 'css' }]
        ]
    }
},
  externals: [{
      'react': 'React'
    },
    {
      'react-dom': 'ReactDOM'
    },
    {
      'antd': 'antd'
    },
    {
      'jquery': 'jQuery'
    },
    {
      '$': '$'
    },
    {
      'ecCom': 'ecCom'
    },
    {
      'comsMobx': 'comsMobx'
    },
    {
      'mobx': 'mobx'
    },
    {
      'weaCrmEngine': 'weaCrmEngine'
    },
    {
      'modeCom': 'modeCom'
    },
    {
      'History': 'History'
    },
    {
      'weaHrm': 'weaHrm'
    },
    {
      'weaCrm': 'weaCrm'
    },
    {
      'weaCrmReport': 'weaCrmReport'
    }
    ,    {
      'weaCrmEngine': 'weaCrmEngine'
    },
    {
      'weaWorkplan': 'weaWorkplan'
    }
  ],
  "proxy": {
    "/api/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/api/": "/api/"
      }
    },
    "/cloudstore/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/cloudstore/": "/cloudstore/"
      }
    },
    "/weaver/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/weaver/": "/weaver/"
      }
    },
    "/js/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/js/": "/js/"
      }
    },
    "/font/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/font/": "/font/"
      }
    },
    "/spa/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/spa/": "/spa/"
      }
    },
    "/formmode/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/formmode/": "/formmode/"
      }
    },
    "/social/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/social/": "/social/"
      }
    },
    "/wui/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/wui/": "/wui/"
      }
    },
    "/images/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/images/": "/images/"
      }
    },
    "/qrcode/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/qrcode/": "/qrcode/"
      }
    },
    "/proj/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/proj/": "/proj/"
      }
    },
    "/systeminfo/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/systeminfo/": "/systeminfo/"
      }
    },
    "/CreateBarCode/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/CreateBarCode/": "/CreateBarCode/"
      }
    },
    "/js/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/js/": "/js/"
      }
    },
    "/css/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/css/": "/css/"
      }
    },
    "/src4js/*": {
      "target": "http://127.0.0.1:8080/",
      "changeOrigin": true,
      "pathRewrite": {
        "^/src4js/": "/src4js/"
      }
    },
  },
};