let config = require('./src4js/weaconfig/weaconfig');
let e9path = require('./src4js/weaconfig/weapath4e9');

//是否热部署
let mode = "release";
//mode = "debug"

//编译模式，是按发布版编译还是按开发版编译
let node_env = "production";
//node_env = "development";

let custom = false; //是否是自定义路径模式

if(custom) { //自定义配置
    const apps = {
        //前台调试主入口
        "main_debug":{
            entry: "./project/WEAVER_E9/src4js/pc/main/index-debug.js",
            output: "./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/js/index-debug.js",
            styleUrl: "./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/css/index-debug.css"
        },
    }
    let obj = apps['ecology9'];
    module.exports = config.create(obj,mode,node_env);
}
else { //已内置配置
    const pathConfig = {
        name:"demo", //打包的功能名，参照此文件底部的说明配置
        srcPath:"..", //本地源代码路径src4js的上一层，比如main的完整的路径为：./project/WEAVER_E9/src4js/pc/main/index.js
        //srcPath:"./project/WEAVER_CloudStore_ec",
        //runPath:"./project/WEAVER_E9/WebRoot/ecology", //本地编译后路径ecology一层，比如main的完整的路径为：./project/WEAVER_E9/WebRoot/ecology/wui/theme/ecology9/js/index.js
        runPathJs:"ljc/engine.js", //这个地址可以选择输出到源码环境、demo、补丁包中
        runPathCss:"ljc/engine.css",
        mode:mode
    }

    let obj = e9path.getPath(pathConfig);
// console.log(JSON.stringify(obj))
    module.exports = config.create(obj,mode,node_env);
}
/*
 E9模块对应配置说明
 main - 主入口（正式环境目前已上线的模块）
 main_debug - 主入口开发版（支持模块最全）
 bs_main - 后台主入口
 coms_global - 流程弹出页目前的老js整体打包压缩
 workflow - 流程
 workflow4dev - 流程（开发版）
 workflow4dev_single - 流程入口（支持流程弹窗打开）
 portal - 门户
 document - 文档
 blog - 微博
 fna - 财务
 meeting - 会议
 hrm - 人力
 inte - 集成
 workplan - 日程
 album - 相册
 coms_redux - 前台redux 公共组件
 coms_mobx - 后台mobx 公共组件
 com_demo - 组件库 api 文档
 odoc - 公文 mobx
 odoc_single - 公文 mobx 单页
 odoc - 公文 mobx
 odoc_single - 公文 mobx 单页
 email - 邮件 mobx
 email_single - 邮件 mobx 单页
 blog_mobx - 微博mobx版
 blog4single_mobx - 微博mobx版单页
 */
