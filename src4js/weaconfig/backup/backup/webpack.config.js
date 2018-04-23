var config = require('./weaconfig');

var appName = "E9_theme_bs";

var mode = "release";

//mode = "debug";

var node_env = "production";

//node_env = "development";

const apps = {
	// *********************** mobx 版 后台 ****************************
	//后台mobx 公共组件
	"E9_coms_mobx": {
		entry: "./pc4backstage/coms/index.js",
		output: "../spa/coms/index.mobx.js",
		outputlib: {
			library: "comsMobx",
			libraryTarget: "umd"
		}
	},
    //后台入口
    "E9_main_bs": {
        entry: "./pc4backstage/main/index.js",
        output: "../spa/main/engine.js"
    },
    //后台主题
    "E9_theme_bs": {
        entry: "./pc4backstage/portal4enginetheme/index.js",
        output: "../wui/theme/ecology9/js/engine.js",
        styleUrl: "../wui/theme/ecology9/css/engine.css",
        outputlib: {
            library: "weaPortalEngineTheme",
            libraryTarget: "umd"
        }
    },
    //后台门户
    "E9_portal_bs": {
        entry: "./pc4backstage/portal4engine/index.js",
        output: "../spa/portal/engine.js",
        styleUrl: "../spa/portal/engine.css",
        outputlib: {
            library: "weaPortalEngine",
            libraryTarget: "umd"
        }
    },
	// *********************** redux 版 前台 ****************************
    //E9 入口
    "E9_main": {
        entry: "./pc/main/index.js",
        output: "../spa/main/index.js"
    },
    //E9 入口 debug
    "E9_main_debug": {
        entry: "./pc/main/index-debug.js",
        output: "../spa/main/index-debug.js"
    },
    //E9 主题
    "E9_theme": {
        entry: "./pc/portal4theme/index.js",
        output: "../wui/theme/ecology9/js/index.js",
        styleUrl: "../wui/theme/ecology9/css/index.css",
        outputlib: {
            library: "weaPortalTheme",
            libraryTarget: "umd"
        }
    },
    //E9 门户
    "E9_portal": {
        entry: "./pc/portal/index.js",
        output: "../spa/portal/index.js",
        styleUrl: "../spa/portal/index.css",
        outputlib: {
            library: "weaPortal",
            libraryTarget: "umd"
        }
    },
	//流程单页 公共基础文件
	"global": {
		entry: "./pc/coms/global/js/index.js",
		output: "../spa/workflow/global.js",
		styleUrl: "../spa/workflow/global.css",
	},
	//人力
	"E9_hrm": {
		entry: "./pc/hrm/index.js",
		output: "../spa/hrm/index.js",
		styleUrl: "../spa/hrm/index.less",
		outputlib: {
			library: "weaHrm",
			libraryTarget: "umd"
		},
	},
	//知识
	"E9_doc": {
		entry: "./pc/document/index.js",
		output: "../spa/document/index.js",
		styleUrl: "../spa/document/index.less",
		outputlib: {
			library: "weaDoc",
			libraryTarget: "umd"
		},
	},
	//流程
	"E9_workflow": {
		entry: "./pc/workflow/index.js",
		output: "../spa/workflow/index.js",
		styleUrl: "../spa/workflow/index.less",
		outputlib: {
			library: "weaWorkflow",
			libraryTarget: "umd"
		},
	},
	//流程 dev
	"E9_workflow_dev": {
		entry: "./pc/workflow4dev/index.js",
		output: "../spa/workflow/index.js",
		styleUrl: "../spa/workflow/index.less",
		outputlib: {
			library: "weaWorkflow",
			libraryTarget: "umd"
		},
	},
	//流程表单单页
	"E9_workflow_req_single": {
		entry: "./pc/workflow/single.js",
		output: "../spa/workflow/index4single.js",
	},
	//流程表单单页 dev
	"E9_workflow_req_single_dev": {
		entry: "./pc/workflow4dev/single.js",
		output: "../spa/workflow/index4single.js",
	},
	//财务
	"E9_fna": {
		entry: "./pc/fna/index.js",
		output: "../spa/fna/index.js",
		styleUrl: "../spa/fna/index.less",
		outputlib: {
			library: "weaFna",
			libraryTarget: "umd"
		},
	},
	//会议
	"E9_meeting": {
		entry: "./pc/meeting/index.js",
		output: "../spa/meeting/index.js",
		styleUrl: "../spa/meeting/index.less",
		outputlib: {
			library: "weaMeeting",
			libraryTarget: "umd"
		},
	},
	//微博
	"E9_blog": {
		entry: "./pc/blog/index.js",
		output: "../spa/blog/index.js",
		styleUrl: "../spa/blog/index.less",
		outputlib: {
			library: "weaBlog",
			libraryTarget: "umd"
		},
	},
    //集成
    "E9_inte": {
        entry: "./pc/inte/index.js",
        output: "../spa/inte/index.js",
        styleUrl: "../spa/inte/index.less",
        outputlib: {
            library: "weaInte",
            libraryTarget: "umd"
        },
    },
}

module.exports = config.create(apps[appName], mode, node_env);