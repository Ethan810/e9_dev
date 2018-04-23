import { observable, action, autorun,toJS } from 'mobx';

import {WeaTools} from "ecCom"
import objectAssign from 'object-assign';
import {message} from 'antd';
import isEqual from 'lodash/isEqual';
import {WeaTableNew} from 'comsMobx'
const {TableStore} = WeaTableNew;
const {ls} = WeaTools;

class AddStore {
    prjtypes = [];
    @observable showDatas = {
		typesShow : [],
		typesCols : [],
		usedBeans : [],
		abcBtns : [],
		commonuse :'',
		user : ''
	}
	
	@observable	mulitcol = ls.getStr('prj-add-mulitcol') == 'false' ? false : true; //true:four false:one
    // @observable	isAbc = ls.getStr('prj-add-isAbc') == 'true' ? true : false;
    @observable isAbc = false
	@observable	abcSelected = "";
	@observable	loading = false;


    @action 
    initDatas(params={}){
		this.loading = true;
		//API_ADD.doWfInfoGet(params).then((data)=>{
			const  data= {
                "commonuse": "",
                "datas": [
                    {
                        "color": "#55D2D4",
                        "id": "54",
                        "img": "icon-New-Flow-Personnel-matters",
                        "order": 0,
                        "typeName": "泛微合肥区流程",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "945",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "zc文档测试",
                                "spell": "WDCS",
                                "typeId": "54",
                                "isview":"1"
                            }
                        ],
                       
                    }, {
                        "color": "#FF9537",
                        "id": "99",
                        "img": "icon-coms-task-list",
                        "order": 0,
                        "typeName": "zss",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "996",
                                "isImportWf": "",
                                "letter": "Q",
                                "name": "请假流程-zss2",
                                "spell": "QJLC",
                                "typeId": "99",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "951",
                                "isImportWf": "",
                                "letter": "J",
                                "name": "加班申请zss",
                                "spell": "JBSQ",
                                "typeId": "99",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "994",
                                "isImportWf": "",
                                "letter": "J",
                                "name": "角色人员zss",
                                "spell": "JSRY",
                                "typeId": "99",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "903",
                                "isImportWf": "",
                                "letter": "R",
                                "name": "入职流程zss",
                                "spell": "RZLC",
                                "typeId": "99",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#8DCE36",
                        "id": "32",
                        "img": "icon-New-Flow-printing",
                        "order": 0,
                        "typeName": "项目管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "814",
                                "isImportWf": "1",
                                "letter": "L",
                                "name": "license授权文件申请(技术中心)",
                                "spell": "SQWJSQJSZX",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "748",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微项目实施交接立项流程",
                                "spell": "FWXMSSJJLXLC",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "591",
                                "isImportWf": "",
                                "letter": "X",
                                "name": "项目开发申请流程--泛微郑州",
                                "spell": "XMKFSQLCFWZZ",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "218",
                                "isImportWf": "",
                                "letter": "D",
                                "name": "第三方软、硬件需求申请",
                                "spell": "DSFRYJXQSQ",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "762",
                                "isImportWf": "1",
                                "letter": "F",
                                "name": "泛微软件开票申请流程",
                                "spell": "FWRJKPSQLC",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "532",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微项目部公章使用申请",
                                "spell": "FWXMBGZSYSQ",
                                "typeId": "32",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "214",
                                "isImportWf": "1",
                                "letter": "H",
                                "name": "合同收款发票开具及快递申请",
                                "spell": "HTSKFPKJJKDSQ",
                                "typeId": "32",
                                
                            },
                        ],
                       
                    }, {
                        "color": "#37B2FF",
                        "id": "33",
                        "img": "icon-New-Flow-summary",
                        "order": 0,
                        "typeName": "任务管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "205",
                                "isImportWf": "1",
                                "letter": "E",
                                "name": "Ecology收款及开发任务申请流程",
                                "spell": "SKJKFRWSQLC",
                                "typeId": "33",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "485",
                                "isImportWf": "1",
                                "letter": "B",
                                "name": "标准产品需求评审",
                                "spell": "BZCPXQPS",
                                "typeId": "33",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "478",
                                "isImportWf": "",
                                "letter": "C",
                                "name": "产品开发计划制定及任务跟踪",
                                "spell": "CPKFJHZDJRWGZ",
                                "typeId": "33",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FF9537",
                        "id": "26",
                        "img": "icon-coms-task-list",
                        "order": 0,
                        "typeName": "总结和计划",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "433",
                                "isImportWf": "",
                                "letter": "B",
                                "name": "半年度/年度工作总结与计划",
                                "spell": "BNDNDGZZJYJH",
                                "typeId": "26",
                                "usedtodo": "1",
                                "usedtodoorder": 5,
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "79",
                                "isImportWf": "",
                                "letter": "Y",
                                "name": "月工作总结与计划",
                                "spell": "YGZZJYJH",
                                "typeId": "26",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "80",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "周工作小结与计划",
                                "spell": "ZGZXJYJH",
                                "typeId": "26",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FF5E56",
                        "id": "23",
                        "img": "icon-coms-Paste",
                        "order": 0,
                        "typeName": "人事管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "750",
                                "isImportWf": "1",
                                "letter": "X",
                                "name": "新员工入职&培训流程",
                                "spell": "XYGRZPXLC",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "875",
                                "isImportWf": "",
                                "letter": "Y",
                                "name": "员工辞职申请流程",
                                "spell": "YGCZSQLC",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "746",
                                "isImportWf": "1",
                                "letter": "F",
                                "name": "泛微出差/外出流程",
                                "spell": "FWCCWCLC",
                                "typeId": "23",
                                "usedtodo": "1",
                                "usedtodoorder": 4,
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "968",
                                "isImportWf": "1",
                                "letter": "F",
                                "name": "泛微出差/外出流程(2017-09-08 09:09:35导入)",
                                "spell": "FWCCWCLCDR",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "942",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微请假流程(2017-08-11 10:53:42导入)",
                                "spell": "FWQJLCDR",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "206",
                                "isImportWf": "1",
                                "letter": "F",
                                "name": "泛微请假流程（old）",
                                "spell": "FWQJLC",
                                "typeId": "23",
                                "usedtodo": "1",
                                "usedtodoorder": 0,
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "329",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微人才推荐流程",
                                "spell": "FWRCTJLC",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "261",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微人事岗位调动流程",
                                "spell": "FWRSGWDDLC",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "213",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "泛微转正申请流程",
                                "spell": "FWZZSQLC",
                                "typeId": "23",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "697",
                                "isImportWf": "1",
                                "letter": "X",
                                "name": "新员工入职&培训流程（T）",
                                "spell": "XYGRZPXLC",
                                "typeId": "23",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FFC62E",
                        "id": "42",
                        "img": "icon-meeting-cycle",
                        "order": 0,
                        "typeName": "客户服务",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "749",
                                "isImportWf": "",
                                "letter": "K",
                                "name": "客户需求和建议评估流程",
                                "spell": "KHXQHJYPGLC",
                                "typeId": "42",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "241",
                                "isImportWf": "1",
                                "letter": "F",
                                "name": "泛微客服部培训申请",
                                "spell": "FWKFBPXSQ",
                                "typeId": "42",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "323",
                                "isImportWf": "",
                                "letter": "J",
                                "name": "金牌用户、优秀项目推广人及管理员奖杯申请",
                                "spell": "JPYHYXXMTGRJGLYJBSQ",
                                "typeId": "42",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "824",
                                "isImportWf": "1",
                                "letter": "K",
                                "name": "客服期刊或重要通知",
                                "spell": "KFQKHZYTZ",
                                "typeId": "42",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "304",
                                "isImportWf": "",
                                "letter": "K",
                                "name": "客服意外服务单",
                                "spell": "KFYWFWD",
                                "typeId": "42",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "571",
                                "isImportWf": "",
                                "letter": "K",
                                "name": "客户满意度调查礼品申请",
                                "spell": "KHMYDDCLPSQ",
                                "typeId": "42",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#55D2D4",
                        "id": "44",
                        "img": "icon-New-Flow-Personnel-matters",
                        "order": 0,
                        "typeName": "培训管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "277",
                                "isImportWf": "",
                                "letter": "C",
                                "name": "产品考核延考申请流程",
                                "spell": "CPKHYKSQLC",
                                "typeId": "44",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "892",
                                "isImportWf": "",
                                "letter": "X",
                                "name": "新员工产品培训总结",
                                "spell": "XYGCPPXZJ",
                                "typeId": "44",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#B37BFA",
                        "id": "2",
                        "img": "icon-New-Flow-contract",
                        "order": 0,
                        "typeName": "资产管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "50",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "资产报修",
                                "spell": "ZCBX",
                                "typeId": "2",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "370",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "资产处置流程",
                                "spell": "ZCCZLC",
                                "typeId": "2",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "62",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "资产领用",
                                "spell": "ZCLY",
                                "typeId": "2",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "883",
                                "isImportWf": "",
                                "letter": "Z",
                                "name": "资质证书出借流程",
                                "spell": "ZZZSCJLC",
                                "typeId": "2",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FFC62E",
                        "id": "22",
                        "img": "icon-New-Flow-task",
                        "order": 0,
                        "typeName": "工作支持",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "820",
                                "isImportWf": "1",
                                "letter": "E",
                                "name": "e-Financials费控及财务共享支撑服务申请",
                                "spell": "FKJCWGXZCFWSQ",
                                "typeId": "22",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "491",
                                "isImportWf": "",
                                "letter": "S",
                                "name": "售前售后文件资料归档及提醒",
                                "spell": "SQSHWJZLGDJTX",
                                "typeId": "22",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#8DCE36",
                        "id": "24",
                        "img": "icon-New-Flow-printing",
                        "order": 0,
                        "typeName": "行政事务",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "486",
                                "isImportWf": "",
                                "letter": "B",
                                "name": "办公用品申领流程",
                                "spell": "BGYPSLLC",
                                "typeId": "24",
                                "usedtodo": "1",
                                "usedtodoorder": 7,
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "96",
                                "isImportWf": "",
                                "letter": "G",
                                "name": "公章使用申请",
                                "spell": "GZSYSQ",
                                "typeId": "24",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "281",
                                "isImportWf": "",
                                "letter": "M",
                                "name": "名片印刷申请",
                                "spell": "MPYSSQ",
                                "typeId": "24",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "282",
                                "isImportWf": "",
                                "letter": "S",
                                "name": "私车公用补贴申请",
                                "spell": "SCGYBTSQ",
                                "typeId": "24",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "283",
                                "isImportWf": "",
                                "letter": "S",
                                "name": "私人笔记本补贴申请",
                                "spell": "SRBJBBTSQ",
                                "typeId": "24",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "106",
                                "isImportWf": "",
                                "letter": "Y",
                                "name": "用车申请",
                                "spell": "YCSQ",
                                "typeId": "24",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#37B2FF",
                        "id": "28",
                        "img": "icon-New-Flow-summary",
                        "order": 0,
                        "typeName": "合同管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "271",
                                "isImportWf": "",
                                "letter": "C",
                                "name": "常规二次销售服务合同审批流程",
                                "spell": "CGECXSFWHTSPLC",
                                "typeId": "28",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "473",
                                "isImportWf": "",
                                "letter": "D",
                                "name": "代理商协议审批流程",
                                "spell": "DLSXYSPLC",
                                "typeId": "28",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "488",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "付款提醒流程",
                                "spell": "FKTXLC",
                                "typeId": "28",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "272",
                                "isImportWf": "",
                                "letter": "L",
                                "name": "老客户增值服务合同审批流程",
                                "spell": "LKHZZFWHTSPLC",
                                "typeId": "28",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "487",
                                "isImportWf": "",
                                "letter": "W",
                                "name": "外包协议审批流程",
                                "spell": "WBXYSPLC",
                                "typeId": "28",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "270",
                                "isImportWf": "",
                                "letter": "X",
                                "name": "新客户购买合同审批流程",
                                "spell": "XKHGMHTSPLC",
                                "typeId": "28",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FF9537",
                        "id": "39",
                        "img": "icon-coms-task-list",
                        "order": 0,
                        "typeName": "印刷资料管理",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "767",
                                "isImportWf": "",
                                "letter": "F",
                                "name": "分公司自用资料申请流程",
                                "spell": "FGSZYZLSQLC",
                                "typeId": "39",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FF5E56",
                        "id": "45",
                        "img": "icon-coms-Paste",
                        "order": 0,
                        "typeName": "泛微北方区综合流程",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "870",
                                "isImportWf": "",
                                "letter": "G",
                                "name": "固定资产领用申请流程-北方区业务运营中心",
                                "spell": "GDZCLYSQLCBFQYWYYZX",
                                "typeId": "45",
                                
                            }
                        ],
                       
                    }, {
                        "color": "#FFC62E",
                        "id": "29",
                        "img": "icon-meeting-cycle",
                        "order": 0,
                        "typeName": "外部访问者支持",
                        "prjbeans": [
                            {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "91",
                                "isImportWf": "",
                                "letter": "D",
                                "name": "对客户的留言",
                                "spell": "DKHDLY",
                                "typeId": "29",
                                
                            }, {
                                "beagenters": [],
                                "belongtoUsers": [],
                                "id": "537",
                                "isImportWf": "",
                                "letter": "K",
                                "name": "客户问题提交",
                                "spell": "KHWTTJ",
                                "typeId": "29",
                                
                            }
                        ],
                       
                    }
                ],
                "user": {
                    "department": "977",
                    "departmentName": "建模测试组",
                    "id": "3381",
                    "jobtitlename": "测试工程师",
                    "lastname": "曾琪",
                    "subcompany": "157"
                }
            };
			this.loading = false;
			this.prjtypes = data.datas;
			this.showDatas = {...this.showDatas,user:data.user};
			this.setUpdate();
		//});
    }

    //设置选中按钮
 	setAbcSelected(v){
        this.abcSelected = v;
        this.setUpdate();
    }
    //切换列数
	setMulitcol(bool){
		this.mulitcol  = bool;
		this.setUpdate();
	}
	
	//是否abc
	setIsAbc(bool){
		this.isAbc = bool;
		this.setUpdate();
	}
    
    	//刷新数据
	setUpdate(){
		const showDatas = {};
 	
		//setTypesShow
		const {prjtypes,isAbc,tabkey,abcSelected,value = ''} = this;

		
		let typesShow = [];
		let abcBtns = [];
		prjtypes.map(w=>{
			let wNew = objectAssign({},w);
			
			typesShow.push(wNew);
		})
		if(isAbc){
    		let typesABC = [];
    		const colorarray = ["#55D2D4","#B37BFA","#FFC62E","#8DCE36","#37B2FF","#FF9537","#FF5E56"];
			for(let i=0; i<27; i++){
        		let prjbeansAbc = [];
        		typesABC.push({
        			"letter": i == 26 ? "···" : String.fromCharCode(65+i),
        			"prjbeans":function(){
	        			typesShow.map(t=>{
    						t.prjbeans.map(b=>{
								b.letter.charCodeAt(0) - 65 == i && prjbeansAbc.push(b);
								i == 26 && (b.letter.charCodeAt(0) >= 91 || b.letter.charCodeAt(0) < 65) && prjbeansAbc.push(b);
        					});
        				});
        				return prjbeansAbc;
        			}(),
        			"color": colorarray[i%7],
        			"disabled": prjbeansAbc.length <= 0,
        			"selected": abcSelected == (i == 26 ? "···" : String.fromCharCode(65+i))
        		});
			}
			abcBtns = typesABC;
			typesShow = typesABC;
		}
		typesShow = typesShow.filter(s=>{
			const {prjbeans =[]} = s;
			return prjbeans.length > 0;
		});
		showDatas.typesShow = typesShow;
		showDatas.abcBtns = abcBtns;
	
		//setTypesCols
		const docWidth = document.documentElement.clientWidth;
		let typesCols = docWidth > 1400 ? [[],[],[],[]] : (docWidth > 1100 ? [[],[],[]] : (docWidth > 600 ? [[],[]] : [[]]));
		let colHeight = docWidth > 1400 ? [0,0,0,0] : (docWidth > 1100 ? [0,0,0] : (docWidth > 600 ? [0,0] : [0]));
		typesShow.length > 0 && typesShow.map(t=>{
			const {prjbeans = []} = t;
			if(prjbeans.length >= 0){
				let minH = Math.min.apply(Math, colHeight);
	   			for(let i = 0 ;i < colHeight.length;i++){
	   				if(colHeight[i] == minH){
	   					typesCols[i].push(t);
	   					colHeight[i] += prjbeans.length;
	   					break;
	   				}
	   			}
			}
		});
		showDatas.typesCols  = typesCols;
	
		//setUsedBeans
		let usedBeans = [];
		typesShow.length > 0 && typesShow.map(t=>{
			const {prjbeans =[]} = t;
			prjbeans.map(b=>{
				b && b.usedtodo == '1' && usedBeans.length < 10 && usedBeans.push(b)
			});
		})
		usedBeans.sort((a,b)=>{
			return a.usedtodoorder - b.usedtodoorder;
		})
		showDatas.usedBeans = usedBeans;
		this.showDatas = {...this.showDatas,...showDatas};
 	}




}
const addStore = new AddStore()
export default addStore;