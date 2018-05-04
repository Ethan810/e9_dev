exports.default = {
  // antd
  antd: {
    entry: '/src4js/pc4com/components/_antd.js',
    output: '/cloudstore/resource/pc/com/v1/index.min.js',
    styleUrl: '/cloudstore/resource/pc/com/v1/index.min.css',
    outputlib: {
      library: 'antd',
      libraryTarget: 'umd',
    },
    isCssSplit: false,
  },
  // E9 组件库
  ecCom: {
    entry: '/src4js/pc4com/components/_ecCom.js',
    output: '/cloudstore/resource/pc/com/v1/ecCom.min.js',
    styleUrl: '/cloudstore/resource/pc/com/v1/ecCom.min.css',
    outputlib: {
      library: 'ecCom',
      libraryTarget: 'umd',
    },
    isCssSplit: false,
  },
  // 云商店应用组件库
  weaCom: {
    entry: '/src4js/pc4com/components/_weaCom.js',
    output: '/cloudstore/resource/pc/com/v1/weaCom.min.js',
    styleUrl: '/cloudstore/resource/pc/com/v1/weaCom.min.css',
    outputlib: {
      library: 'weaCom',
      libraryTarget: 'umd',
    },
    isCssSplit: false,
  },
  // 组件库 API 文档 demo 页
  coms_demo: {
    entry: '/src4js/pc4com/demo/index.js',
    output: '/spa/coms/index.demo.js',
    styleUrl: '/spa/coms/index.demo.css',
  },
  // mobx 公共组件
  coms_mobx: {
    entry: '/src4js/pc4com/comMobx/index.js',
    output: '/spa/coms/index.mobx.js',
    outputlib: {
      library: 'comsMobx',
      libraryTarget: 'umd',
    },
  },
  // 前台 redux 公共组件 （即将废弃）
  coms_redux: {
    entry: '/src4js/pc/coms/index.js',
    output: '/spa/coms/index.redux.js',
    outputlib: {
      library: 'comsRedux',
      libraryTarget: 'umd',
    },
  },
  // 流程单页公共文件整合包
  coms_global: {
    entry: '/src4js/pc/coms/global/js/index.js',
    output: '/spa/workflow/global.js',
    styleUrl: '/spa/workflow/global.css',
  },
   // mobx 公共组件
  cube_coms: {
    entry: '/src4js/pc4com/cubeComponents/components/index.js',
    output: '/spa/cubeComs/index.mobx.js',
    styleUrl: '/spa/cubeComs/index.mobx.css',
    outputlib: {
      library: 'cubeComs',
      libraryTarget: 'umd',
    },
  },
   // 自己的组件库demo 页
   cube_coms_demo: {
    entry: '/src4js/pc4com/cubeComponents/demo/src/single.js',
    output: '/spa/cubeComs/index.demo.js',
    styleUrl: '/spa/cubeComs/index.demo.css',
  },
};

