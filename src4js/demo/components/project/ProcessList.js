import React from 'react';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx"
import { Tree, Menu, TopTitle,Form } from 'modeCom'
import { WeaTools, WeaErrorPage ,WeaNewScroll, WeaRightMenu ,WeaTop,WeaDialog } from 'ecCom';

// import Field from '../../comp/field-element';


import equals from 'deep-equal';
import classnames from 'classnames';

class ProcessList extends React.Component {
    static defaultProps = {
        prefixCls: `111-card`,  
        dataSource:{
            "isOpen": {
                "value": '0',
                "valueSpan":""
            },
            "conInfo": {
                "value": '1',
                "valueSpan":"应用"
            },
            "address": {
                "value": "jfashljk",
                "valueSpan": "",
            },
            "appKey": {
                "valueSpan": "",
                "value": "去玩儿群无"
            },
            "customerType": {
                "value": {
                    "customer": "",
                    "gongyingshang": "1",
                    "fenxiaosahng":""
                }
            },
            "cach": {
                "valueSpan": "",
                "value": "1"
            },
            "day": {
                "valueSpan": "",
                "value": "1"
            }
        },
"collapse": true,
        "defaultActiveCollapse": [
            "base"
        ],
        "groups": [
            {
                "key": "base",
                "name": "应用设置",
                "rows": [
                    {
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "4",
                                    "dataIndex": "isOpen",
                                    "isSingle": true,
                                    "key": "isOpen",
                                    "title": "是否开启",
                                    "type": "3",
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    },
                    {
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "8",
                                    "dataIndex": "comeInfo",
                                    "isSingle": true,
                                    "key": "comeInfo",
                                    "options": [
                                        {
                                            "label": "应用",
                                            "title": "应用",
                                            "value": "1"
                                        }
                                    ],
                                    "title": "信息来源",
                                    "type": "select",
                                    "viewAttr": 2,
                                },
                                "span": 24
                            }
                        ]
                    }, {
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "1",
                                    "dataIndex": "address",
                                    "isSingle": true,
                                    "key": "address",
                                    "title": "接口地址",
                                    "type": "1",
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    }, {
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "1",
                                    "dataIndex": "appkey",
                                    "isSingle": true,
                                    "key": "appkey",
                                    "title": "APP_KEY",
                                    "type": "1",
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    }
                    , {
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "4",
                                    "dataIndex": "customerType",
                                    "isSingle": false,
                                    "key": "customerType",
                                    "title": "适用客户类型",
                                    "type": "group",
                                    checkType:"checkBox",
                                    "labels": [
                                        {
                                            "dataIndex": "customer",
                                            "title": "客户"
                                        }, {
                                            "dataIndex": "gongyingshang",
                                            "title": "供应商"
                                        }, {
                                            "dataIndex": "fenxiaoshang",
                                            "title": "分销商"
                                        }, 
                                    ],
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    },{
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "4",
                                    "dataIndex": "cach",
                                    "isSingle": true,
                                    "key": "cach",
                                    "title": "是否缓存数据",
                                    "type": "3",
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    },{
                        "cols": [
                            {
                                "field": {
                                    "colSpan": 1,
                                    "component": "1",
                                    "dataIndex": "day",
                                    "isSingle": true,
                                    "key": "day",
                                    "title": "缓存保存天数",
                                    "type": "2",
                                    "viewAttr": 2
                                },
                                "span": 24
                            }
                        ]
                    },
                ]
            }
        ],
    }
	constructor(props) {
        super(props);
    }

    componentDidMount = () => {
	}
    render() {
		const {groups = [], collapse = false, rightMenu = [],  top,defaultActiveCollapse,height,dataSource,hasright} =this.props;
        return (
            <div >
                    <Form
                        groups={groups}
                        dataSource={dataSource}
                        collapse={true}
                        noBorder={false}
                        defaultActiveCollapse={toJS(defaultActiveCollapse)}
                        updateDataSource={this.updateDataSource}
                        // update={this.updatePageConfig}
                        size="middle" >
                    </Form>
            </div>
        )
    }
}

export default ProcessList;