import React from 'react';
import { Row,Col } from 'antd';
import {WeaNewScroll } from "ecCom"
import classnames from 'classnames';
import './style/index.less';

class DailyPaper extends React.Component {
    static defaultProps = {
        stageGroups:[
            {
                key:"0",
                name:"全部",
            },
            {
                key:"1",
                name:"立项",
            },
            {
                key:"2",
                name:"搭建中",
            },
            {
                key:"3",
                name:"验收中",
            },
            {
                key:"4",
                name:"维护中",
            },
        ],
        selectGroupTypeKey:"0"
    }
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    renderTitleGroup(stageGroups){
        const {selectGroupTypeKey="0"} = this.props;
        console.log(stageGroups)
        let btnArr = [];
        stageGroups && stageGroups.map((group)=>{
            let isSelect = "";
            if(selectGroupTypeKey == group.key) {
                isSelect = "selected";
            }
            btnArr.push(
                <span key={group.key} onClick={()=>{this.changeTypeGroup(group.key)}} className={isSelect} >
                    {group.name}
                </span>
            )
        })
        return btnArr
    }
    changeTypeGroup=(key)=>{
        console.log(key)
    }

    render() {
        const { stageGroups } = this.props;
   
        return (
            <div className="project-paper">
                <div className="project-paper-header">
                    <Row>
                        <Col span={24}>
                            <span className="header-left">阶段 :</span>
                            <span className="header-right">{stageGroups && this.renderTitleGroup(stageGroups)}</span>
                        </Col>
                    </Row>
                </div>
                <WeaNewScroll
                    scrollId={'project-paper-scroll'}
                    height={"100%"}
                >
                    <div className="project-paper-body">
                        <Row>
                            <Col span={24}>
                                <div className="body-img"></div>
                                <div className="body-right">
                                    <div className="body-right-title">
                                        <span className="body-right-title-left"><span style={{marginRight:"10px"}}>张三</span> 泛微上海大区/EBU上海一部 </span>
                                        <span className="body-right-title-right">回复评论 </span>
                                    </div>
                                    <div className="body-right-time">2017/02/05 14:22</div>
                                    <div className="body-right-content">
                                        <div className="body-right-content-h body-right-content-title">项目:<span className="project-name" >上海投资咨询公司（二次开发合同）2012</span> 当前阶段: 立项  当前任务：需求调研</div>
                                        <div className="body-right-content-h body-right-content-reply">预计十一之后收取第三笔款，现场调研确认，需求变更与新增工作量</div>
                                        <div className="body-right-content-h body-right-content-link">相关文档：人力资源模块调研文档(v1)</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="body-img"></div>
                                <div className="body-right">
                                    <div className="body-right-title">
                                        <span className="body-right-title-left"><span style={{marginRight:"10px"}}>张三</span> 泛微上海大区/EBU上海一部 </span>
                                        <span className="body-right-title-right"></span>
                                    </div>
                                    <div className="body-right-time">2017/02/05 14:22</div>
                                    <div className="body-right-content">
                                        <div className="body-right-content-h body-right-content-title">项目:<span className="project-name" >上海投资咨询公司（二次开发合同）2012</span> 当前阶段: 立项  当前任务：需求调研</div>
                                        <div className="body-right-content-h body-right-content-reply">预计十一之后收取第三笔款，现场调研确认，需求变更与新增工作量</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="body-img"></div>
                                <div className="body-right">
                                    <div className="body-right-title">
                                        <span className="body-right-title-left"><span style={{marginRight:"10px"}}>张三</span> 泛微上海大区/EBU上海一部 </span>
                                        <span className="body-right-title-right"></span>
                                    </div>
                                    <div className="body-right-time">2017/02/05 14:22</div>
                                    <div className="body-right-content">
                                        <div className="body-right-content-h body-right-content-title">项目:<span className="project-name" >上海投资咨询公司（二次开发合同）2012</span> 当前阶段: 立项  当前任务：需求调研</div>
                                        <div className="body-right-content-h body-right-content-reply">预计十一之后收取第三笔款，现场调研确认，需求变更与新增工作量</div>
                                        <div className="body-right-content-reply-reply">
                                            <div className="reply-container"> 
                                                <div className="reply-name">李四  2017/05/02 14:55</div>
                                                <div className="reply-content">ok!!!</div>
                                            </div>
                                            <div className="reply-container"> 
                                                <div className="reply-name">王五  2017/05/02 16:55</div>
                                                <div className="reply-content">没问题。</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </WeaNewScroll>
            </div>
        )
    }
}

export default DailyPaper