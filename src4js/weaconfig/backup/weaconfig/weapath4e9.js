exports.getPath = function (config) {
  const apps = {
    //前台主入口
    "main": {
      entry: config.srcPath + "/src4js/pc/main/index.js",
      output: config.runPath + "/spa/main/index.js",
      styleUrl: config.runPath + "/spa/main/index.css"
    },
    //前台调试主入口
    "main_debug": {
      entry: config.srcPath + "/src4js/pc/main/index-debug.js",
      output: config.runPath + "/spa/main/index-debug.js",
      styleUrl: config.runPath + "/spa/main/index-debug.css"
    },
    //流程弹出页公共文件整合包
    "coms_global": {
      entry: config.srcPath + "/src4js/pc/coms/global/js/index.js",
      output: config.runPath + "/spa/workflow/global.js",
      styleUrl: config.runPath + "/spa/workflow/global.css"
    },
    //mobx版前台入口
    "main_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/amain/index.js",
      output: config.runPath + "/spa/main/index-mobx.js"
    },
    //前台redux 公共组件
    "coms_redux": {
      entry: config.srcPath + "/src4js/pc/coms/index.js",
      output: config.runPath + "/spa/coms/index.redux.js",
      outputlib: {weaconfig.js
        library: "comsRedux",
        libraryTarget: "umd"
      }
    },
    //后台mobx 公共组件
    "coms_mobx": {
      entry: config.srcPath + "/src4js/pc4backstage/coms/index.js",
      output: config.runPath + "/spa/coms/index.mobx.js",
      outputlib: {
        library: "comsMobx",
        libraryTarget: "umd"
      }
    },
    //组件库 API 文档 demo 页
    "com_demo": {
      entry: config.srcPath + "/src4js/pc/components/index.js",
      output: config.runPath + "/spa/coms/index.demo.js",
      styleUrl: config.runPath + "/spa/coms/index.demo.css",
      outputlib: {
        library: "componentsDemo",
        libraryTarget: "umd"
      }
    },
    //流程
    "workflow": {
      entry: config.srcPath + "/src4js/pc/workflow/index.js",
      output: config.runPath + "/spa/workflow/index.js",
      styleUrl: config.runPath + "/spa/workflow/index.css",
      outputlib: {
        library: "weaWorkflow",
        libraryTarget: "umd"
      }
    },
    "workflow_single":{
        entry: config.srcPath + "/src4js/pc/workflow/single.js",
        output: config.runPath + "/spa/workflow/index4single.js",
    },
    "workflow_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/workflow/index.js",
      output: config.runPath + "/spa/workflow/index_mobx.js",
      styleUrl: config.runPath + "/spa/workflow/index_mobx.css",
      outputlib: {
        library: "weaWorkflow",
        libraryTarget: "umd"
      }
    },
    "workflow4single_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/workflow/single.js",
      output: config.runPath + "/spa/workflow/index4single_mobx.js"
    },
    //主题
    "theme": {
      entry: config.srcPath + "/src4js/pc/portal4theme/index.js",
      output: config.srcPath + "/wui/theme/ecology9/js/index.js",
      styleUrl: config.srcPath + "/wui/theme/ecology9/css/index.css",
      outputlib: {
        library: "weaPortalTheme",
        libraryTarget: "umd"
      }
    },
    //门户
    "portal": {
      entry: config.srcPath + "/src4js/pc/portal/index.js",
      output: config.runPath + "/spa/portal/index.js",
      styleUrl: config.runPath + "/spa/portal/index.css",
      outputlib: {
        library: 'weaPortal',
        libraryTarget: 'umd'
      }
    },
    //文档
    "document": {
      entry: config.srcPath + "/src4js/pc/document/index.js",
      output: config.runPath + "/spa/document/index.js",
      styleUrl: config.runPath + "/spa/document/index.css",
      outputlib: {
        library: "weaDoc",
        libraryTarget: "umd"
      }
    },
    "document_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/document/index.js",
      output: config.runPath + "/spa/document/index_mobx.js",
      styleUrl: config.runPath + "/spa/document/index_mobx.css",
      outputlib: {
        library: "weaDoc",
        libraryTarget: "umd"
      }
    },
    "document4single_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/document/single.js",
      output: config.runPath + "/spa/document/index4single_mobx.js"
    },
    //微博
    "blog": {
      entry: config.srcPath + "/src4js/pc/blog/index.js",
      output: config.runPath + "/spa/blog/index.js",
      styleUrl: config.runPath + "/spa/blog/index.css",
      outputlib: {
        library: "weaBlog",
        libraryTarget: "umd"
      }
    },
    //微博单页
    "blog4dev_single": {
      entry: config.srcPath + "/src4js/pc/blog/single.js",
      output: config.runPath + "/spa/blog/index4single.js"
    },
    //财务
    "fna": {
      entry: config.srcPath + "/src4js/pc/fna/index.js",
      output: config.runPath + "/spa/fna/index.js",
      styleUrl: config.runPath + "/spa/fna/index.css",
      outputlib: {
        library: "weaFna",
        libraryTarget: "umd"
      }
    },
	//财务流程
	"fnaSpecial":{
        entry: config.srcPath + "/src4js/pc/fna/public/index.js",
        output: config.runPath + "/spa/fna/fnaSpecial/index.js",
        outputlib: {
            library: "weaFnaSpecial",
            libraryTarget: "umd"
        },
	},
    //会议
    "meeting": {
      entry: config.srcPath + "/src4js/pc/meeting/index.js",
      output: config.runPath + "/spa/meeting/index.js",
      styleUrl: config.runPath + "/spa/meeting/index.css",
      outputlib: {
        library: "weaMeeting",
        libraryTarget: "umd"
      }
    },
    //资产
    "cpt": {
      //entry:config.srcPath+"/src4js/pc/cpt/single.js",
      entry: config.srcPath + "/src4js/pc/cpt/index.js",
      output: config.runPath + "/spa/cpt/index.js",
      styleUrl: config.runPath + "/spa/cpt/index.css",
      outputlib: {
        library: "weaCpt",
        libraryTarget: "umd"
      }
    },
    //资产单页
    "cpt_single": {
      entry: config.srcPath + "/src4js/pc/cpt/single.js",
      output: config.runPath + "/spa/cpt/index4single.js"
    },
    //人力
    "hrm": {
      entry: config.srcPath + "/src4js/pc/hrm/index.js",
      output: config.runPath + "/spa/hrm/index.js",
      styleUrl: config.runPath + "/spa/hrm/index.css",
      outputlib: {
        library: "weaHrm",
        libraryTarget: "umd"
      }
    },

    //人力4Formal
    "E9_hrm4Formal": {
      entry: config.srcPath + "/src4js/pc/hrm/index4Formal.js",
      output: config.runPath + "/index.js",
      styleUrl: config.runPath + "/index.css",
      outputlib: {
        library: "weaHrm",
        libraryTarget: "umd"
      },
    },
    //人力
    "E9_hrm": {
      entry: config.srcPath + "/src4js/pc/hrm/index4Formal.js",
      output: config.runPath + "/index.js",
      styleUrl: config.runPath + "/index.css",
      outputlib: {
        library: "weaHrm",
        libraryTarget: "umd"
      },
    },
    //集成
    "inte": {
      entry: config.srcPath + "/src4js/pc/inte/index.js",
      output: config.runPath + "/spa/inte/index.js",
      styleUrl: config.runPath + "/spa/inte/index.css",
      outputlib: {
        library: "weaInte",
        libraryTarget: "umd"
      }
    },
    //日程
    "workplan": {
      entry: config.srcPath + "/src4js/pc/workplan/index.js",
      output: config.runPath + "/spa/workplan/index.js",
      styleUrl: config.runPath + "/spa/workplan/index.css",
      outputlib: {
        library: "weaWorkplan",
        libraryTarget: "umd"
      }
    },
    "workplan_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/workplan/index.js",
      output: config.runPath + "/spa/workplan/index_mobx.js",
      styleUrl: config.runPath + "/spa/workplan/index_mobx.css",
      outputlib: {
        library: "weaWorkplan",
        libraryTarget: "umd"
      }
    },
    "workplan4single_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/workplan/single.js",
      output: config.runPath + "/spa/workplan/index4single_mobx.js"
    },
    //相册
    "album": {
      entry: config.runPath + "/src4js/pc/album/index.js",
      output: config.runPath + "/spa/album/index.js",
      styleUrl: config.runPath + "/spa/album/index.css",
      outputlib: {
        library: "weaAlbum",
        libraryTarget: "umd"
      },
    },
    //后台入口
    "bs_main": {
      entry: config.srcPath + "/src4js/pc4backstage/main/index.js",
      output: config.runPath + "/spa/main/engine.js",
      styleUrl: config.runPath + "/spa/main/engine.css"
    },
    //后台主题
    "ba_theme": {
      entry: config.srcPath + "/src4js/pc4backstage/portal4enginetheme/index.js",
      output: config.srcPath + "/wui/theme/ecology9/js/engine.js",
      styleUrl: config.srcPath + "/wui/theme/ecology9/css/engine.css",
      outputlib: {
        library: "weaPortalEngineTheme",
        libraryTarget: "umd"
      }
    },
    //后台门户
    "ba_portal": {
      entry: config.srcPath + "/src4js/pc4backstage/portal4engine/index.js",
      output: config.srcPath + "/spa/portal/engine.js",
      styleUrl: config.srcPath + "/spa/portal/engine.css",
      outputlib: {
        library: "weaPortalEngine",
        libraryTarget: "umd"
      }
    },
    // antd 组件
    "antd": {
      entry: config.srcPath + "/src4js/components/_antd.js",
      output: config.runPath + "/index.min.js",
      styleUrl: config.runPath + "/index.min.css",
      outputlib: {
        library: "antd",
        libraryTarget: "umd"
      },
      isCssSplit: false
    },
    // E9 组件
    "ecCom": {
      entry: config.srcPath + "/src4js/components/_ecCom.js",
      output: config.runPath + "/ecCom.min.js",
      styleUrl: config.runPath + "/ecCom.min.css",
      outputlib: {
        library: "ecCom",
        libraryTarget: "umd"
      },
      isCssSplit: false
    },
    // 云商店组件
    "weaCom": {
      entry: config.srcPath + "/src4js/components/_weaCom.js",
      output: config.runPath + "/weaCom.min.js",
      styleUrl: config.runPath + "/weaCom.min.css",
      outputlib: {
        library: "weaCom",
        libraryTarget: "umd"
      },
      isCssSplit: false
    },
    "cowork": {
      entry: config.srcPath + "/src4js/pc/cowork/index.js",
      output: config.runPath + "/spa/cowork/index.js",
      styleUrl: config.runPath + "/spa/cowork/index.css",
      outputlib: {
        library: "weaCowork",
        libraryTarget: "umd"
      }
    },
    "cowork_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/cowork/index.js",
      output: config.runPath + "/spa/cowork/index_mobx.js",
      styleUrl: config.runPath + "/spa/cowork/index_mobx.css",
      outputlib: {
        library: "weaCowork",
        libraryTarget: "umd"
      }
    },
    "cowork4single_mobx": {
      entry: config.srcPath + "/src4js/pc4mobx/cowork/single.js",
      output: config.runPath + "/spa/cowork/index4single_mobx.js",
	  styleUrl: config.runPath+ "/spa/cowork/index4single_mobx.css",
    },
  }
  return apps[config.name];
}
