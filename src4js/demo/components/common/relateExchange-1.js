
import {Button,Row,Col,Icon,message} from 'antd';
import {WeaNewScroll,WeaTextarea,WeaSearchGroup ,WeaRichText } from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import * as Util from '../../util/index'

@observer
export default class RelateExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        showGroup:true,
        richValue:"",
        status:"",
        "doc":"",
        "task":"",
        "crm":"",
        "workflow":"",
        "project":"",
        file:""
    }

  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps) {
 
  }
  render() {
      const {showGroup,richValue} = this.state;
    const basicToolBar = {
        toolbar: [
            { name: 'document', items: [ 'Source'] },
            { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor' ] },
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', ] },
        ],
        extraPlugins: 'autogrow',
        height:150,
        autoGrow_minHeight: 150,
        autoGrow_maxHeight: 600,
        removePlugins: 'resize',
      };
      
      // 顶部，底部工具栏扩展
      const bottomBarConfig = [
        {
          name: 'Browser', // 浏览按钮组件
          show: <span style={{ fontSize: 12 }}>
            <i className='icon-coms-Journal' title='文档' /> 相关文档</span>, // 使用组件库图标
          type: '37', // 浏览按钮类型 文档
          title: '文档', // 浏览按钮标题
        },
        {
          name: 'Browser', // 浏览按钮组件
          show: <span style={{ fontSize: 12 }}>
            <i className='icon-coms-Workflow-o' title='流程' /> 相关流程</span>,
          type: '152', // 浏览按钮类型
          title: '流程', // 浏览按钮标题
        },
        {
            name: 'Browser', 
            show: <span style={{ fontSize: 12 }}>
              <i className='icon-coms-crm' title='客户' /> 相关客户</span>,
            type: '18', // 浏览按钮类型
            title: '客户', // 浏览按钮标题
        },
        {
            name: 'Browser', 
            show: <span style={{ fontSize: 12 }}>
              <i className='icon-coms-project' title='项目' /> 相关项目</span>,
            type: '135', // 浏览按钮类型
            title: '项目', // 浏览按钮标题
        },
        {
            name: 'Browser', 
            show: <span style={{ fontSize: 12 }}>
              <i className='icon-coms-task-list' title='任务' /> 相关任务</span>,
            type: 'prjtsk', // 浏览按钮类型 --目前没有，等待开发
            title: '任务', // 浏览按钮标题
        },
        {
            name: 'Upload', // 上传组件
            type: 'file', // 上传组件类型
            show: <span style={{ fontSize: 12 }}>
              <Icon type='paper-clip' title='上传附件' /> 附件(此目录下上传附件最大大小:5M)</span>, // 使用 antd 图标
            uploadUrl: '/api/doc/upload/uploadFile?model=reply', // 上传地址 --目前没有，等待开发
            category: '/api/doc/upload/uploadFile?model=reply', // 文档目录 --目前没有，等待开发
            maxUploadSize:5
          },
          {
            name: 'Component',
            style: {float: 'right'},
            show: (
              <Button type="primary" onClick={this.handleSubmitExchange}>
                <span><span>提交</span></span>
              </Button>
            )
          }
      ];
    return (
        <div className="prj-exchange">
           
            <div className="prj-exchange-header">
                <Row className="prj-exchange-title">
                    <Col span="20" className="prj-exchange-title-left">
                        <div>{"相关交流"}</div>
                    </Col>
                    <Col span="4" className="prj-exchange-title-right" >
                        <i className={showGroup ? 'icon-coms-up' : 'icon-coms-down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="prj-exchange-content" style={{display:showGroup ? "block":"none"} }>
                    <Col className="prj-exchange-cell" span={24}>
                        <WeaRichText
                            ref={"prjRelateExchange"}
                            value={richValue}
                            ckConfig={basicToolBar}
                            bottomBarConfig={bottomBarConfig}
                            onChange={v=>this.setState({richValue: v})}
                            onStatusChange={s => this.setState({status: s})}
                            onToolsChange={this.transfStr}
                        />
                    </Col>
                </Row>
              
            </div>
            
            <div></div>
            {
                // <div>  <Row>
                    // <Col className="prj-exchange-header-left" span={12}>相关交流</Col>
                    // <Col className="prj-exchange-header-right" span={12}><Button type="primary">提交</Button></Col>
                // </Row>
            //     <WeaTextarea fieldName="prjrelateExchange" minRows={4} maxRows={8} />
            //     </div>
            //    <WeaSearchGroup title={"title"} customComponent="附加信息">
    
            //    </WeaSearchGroup>
            }
        </div>)
    }
    transfStr = (name = '', ids = '', list = [], type = '') => {
        console.log(name , ids, list , type )
        const {doc,task,workflow,crm,project,} = this.state;
        if(type == "37"){
           
        }else if(type== "prjtsk"){

        }else if(type== "18"){
            
        }else if(type== "152"){
            
        }else if(type== "135"){
            
        }else if(type== "file"){
            
        }
        let str = '';
        const mirror = {
            37: "doc",
            prjtsk: "task",
            18: "crm",
            152: "workflow",
            135: "project",
        }
        list.map(item => {
            if(name === 'Upload' && type === 'image'){
                str += '<img class="formImgPlay" src="' + item.filelink + '" data-imgsrc="' + (item.loadlink || item.filelink) + '" />'
            }
            if(name === 'Upload' && type === 'file'){
                str += (`<a href='javascript:void(0)'  style='cursor:pointer;text-decoration:underline !important;margin-right:8px'>${item.filename}</a><br>`)
            }
            if(name === 'Browser'){
                str += ( `<a href='javascript:void(0)'  style='cursor:pointer;text-decoration:underline !important;margin-right:8px'>${item.name || item.showname}</a><br>`)
            }
        })
        return str
    }
    handleSubmitExchange=()=>{
        let { richValue} = this.state;
        let ckref = this.refs.prjRelateExchange;
        if (!ckref.checkMode()) {
            message.error("不能以源码模式或markdown模式保存，请将编辑器切换到可视化模式");
            return;
        }
        console.log(richValue);

        this.refs.prjRelateExchange.setData('');
    }
}

