const config = require('./src4js/weaconfig/weaconfig');
const path_e9 = require('./src4js/weaconfig/weapath4e9').default;
const path_e9_coms = require('./src4js/weaconfig/weapath4e9-coms').default;
const path_e9_eng = require('./src4js/weaconfig/weapath4e9-eng').default;
const argv = require('yargs').argv;

const getPath = ({ name, srcPath, runPath }, paths) => {
  if (!paths[name]) {
    console.error(`\n======
      请检查 src4js/webpack.config.js 的配置, 找不到 name 为 ${
      name} 的 APP ！！！！！\n======\n\n`);
    return;
  }
  const app = paths[name];
  const { entry, output, styleUrl } = app;
  return Object.assign(app, {
    entry: `${srcPath}${entry}`,
    output: `${runPath}${output}`,
  }, styleUrl ? { styleUrl: `${runPath}${styleUrl}` } : {});
};

// 运行模式：release打包模式，debug调试模式
let mode = 'release';
// mode = 'debug';

// 编译模式：production发布版、development开发版
let node_env = 'production';
// node_env = 'development';

// 是否是自定义路径模式，自定义模式可以自己写完整地址
const custom = false;

if (custom) {
  // 自定义路径
  const customAppName = 'workflow';
  module.exports = config.create(({
    // 流程
    workflow: {
      entry: '../src4js/pc4mobx/workflow/index.js',
      output: '../spa/workflow/index_mobx.js',
      styleUrl: '../spa/workflow/index_mobx.css',
      outputlib: {
        library: 'weaWorkflow',
        libraryTarget: 'umd',
      },
    },
  })[customAppName], mode, node_env);
} else {
  // 已内置配置
  const pathConfig = {
    name: 'demo', // 查阅底部注释列表
    srcPath: 'E:/e9_dev', // 本地源码路径，src4js 上一层, 或本地 svn 绝对路径 'D:/ecology'
    runPath: 'E:/e9_dev', // 打包后路径，spa wui 等上一层, 或本地绝对路径 'D:/ecology'
    mode,
  };
  argv.pubModule && (pathConfig.name = argv.pubModule);
  module.exports = config.create(getPath(
    pathConfig,
    Object.assign(path_e9, path_e9_coms, path_e9_eng)
  ), mode, node_env);
}


