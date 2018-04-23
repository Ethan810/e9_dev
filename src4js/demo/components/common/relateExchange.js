
import {Button,Row,Col,Icon,message,Modal} from 'antd';
import {WeaNewScroll,WeaTextarea,WeaSearchGroup ,WeaRichText,WeaFormItem ,WeaBrowser,WeaUpload,WeaTab} from 'ecCom';
import {inject, observer} from "mobx-react";
import {toJS} from 'mobx';
import ExchangeLogs from './exchangeLogs'
import {Condition} from '../list/listCondition';

@observer
export default class RelateExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        showGroup:false,
        value:"",
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
      const {contentStore} = this.props;
      const {showSearchAd ,exchangeContent,exchangeform } = contentStore;
      const formParams = exchangeform.getFormParams() || {};
      const {showGroup,value} = this.state;
      const formItemLayout = {
        labelCol: { span:5 },
        wrapperCol: { span: 14 },
    };

    return (
        <div className="prj-exchange" style={{height:"100%"}}>
            <div className="prj-exchange-header">
                <WeaTab
                    buttonsAd={this.getAdButtons()}
                    searchType={['base','advanced']}
                    searchsBaseValue={formParams.remark}
                    setShowSearchAd={bool=>{contentStore.setShowSearchAd(bool)}}
                    hideSearchAd={()=> contentStore.setShowSearchAd(false)}
                    searchsAd={
                        <div><Condition listStore={contentStore} form={exchangeform}></Condition></div>
                    }
                    showSearchAd={showSearchAd}
                    onSearch={v=>{contentStore.getRelateExchangeInfo()}}
                    onSearchChange={v=>{contentStore.setFormFields({remark:{value:v}})}}
                />
                <Row className="prj-exchange-content"  style={{margin:"5px 10px 0"}}>
                    <Col className="prj-exchange-cell" span={24}>
                        <WeaTextarea fieldName="prjrelateExchange" value={value} minRows={4} maxRows={8} onChange={v=>{this.saveValue(v)}} />
                    </Col>
                </Row>
                <Row className="prj-exchange-title">
                    <Col span="20" className="prj-exchange-title-left">
                        <div><Button type="primary" onClick={this.handleSubmitExchange}>提交</Button></div>
                    </Col>
                    <Col span="4" className="prj-exchange-title-right" >
                        <span style={{marginRight:"10px"}}>附加信息</span>
                        <i className={showGroup ? 'icon-coms-up' : 'icon-coms-down'} onClick={()=>this.setState({showGroup:!showGroup})}/>
                    </Col>
                </Row>
                <Row className="prj-exchange-content" style={{display:showGroup ? "block":"none"} }>
                    <Col className="prj-exchange-cell prj-exchange-cell-fujian" span={24}>
                       {this.getFormItem()}
                       { (exchangeContent.showacc || false) &&
                            <WeaFormItem
                                label={"相关附件"}
                                { ...formItemLayout}>
                                <WeaUpload 
                                    uploadId="relatedfile"
                                    uploadUrl="/api/crm/common/fileUpload"
                                    category="0,0,0"
                                    autoUpload={true}
                                    showBatchLoad={false}
                                    showClearAll={false}
                                    multiSelection={true}
                                    datas={[]}
                                    maxUploadSize={exchangeContent.accsize}
                                    onChange={this.fileUploadBack}
                                    // onUploading={(state)=>this.hsaUploadState(state)}
                                />
                            </WeaFormItem>
                       }
                    </Col>
                </Row>
            </div>
            <div className="prj-exchange-logs">
                <ExchangeLogs onChange={this.pageNoChange} totalSize={exchangeContent.totalSize} data={toJS(exchangeContent.datas) || []} />
            </div>
        </div>)
    }
    getFormItem(){
        const {contentStore} = this.props;
        const { exchangeContent } = contentStore;
        const items =[
            {label:"相关文档",title:"文档",type:37,key:"doc",show:exchangeContent.showdoc || false},
            {label:"相关流程",title:"流程",type:152,key:"wf",show:exchangeContent.showwf || false},
            {label:"相关客户",title:"客户",type:18,key:"crm",show:exchangeContent.showcrm || false},
            {label:"相关项目",title:"项目",type:135,key:"prj",show:exchangeContent.showprj || false},
            {label:"相关任务",title:"任务",type:'prjtsk',key:"task",show:exchangeContent.showtask || false},
        ];
        const formItemLayout = {
            labelCol: { span:5 },
            wrapperCol: { span: 14 },
        };
        let group =[];
        items.map(item=>{
            if(item.show){
                group.push(
                    <WeaFormItem
                        label={item.label}
                    { ...formItemLayout}>
                        <WeaBrowser   type={item.type} title={item.title} hasAdvanceSerach={true} isSingle={false} onChange ={(ids, names, datas)=>this.docOnchange(item.key,ids, names, datas)} />
                    </WeaFormItem>
                )
            }else{
                return;
            }
            
        })
        return group;
    }
    docOnchange=(type,ids, names, datas)=>{
        if(type =="doc"){
            this.setState({doc:ids})
        }else if(type == "wf"){
            this.setState({workflow:ids})
        }else if(type == "crm"){
            this.setState({crm:ids})
        }else if(type == "task"){
            this.setState({task:ids})
        }else if(type == "prj"){
            this.setState({project:ids})
        }
    }
    fileUploadBack=(arr)=>{
        console.log(arr);
        this.setState({file:arr})
    }
    saveValue=(v)=>{
        this.setState({value:v})
    }

    handleSubmitExchange=()=>{
        const { value,doc,task,crm,workflow, project, file} = this.state;
        if(value){
            console.log(value,doc,task,crm,workflow, project, file)
        }else{
            Modal.info({
                title: '系统提示',
                content: '请填写交流信息!',
            });
        }
    }
    getAdButtons = () => {
        const {contentStore} = this.props;
        const {setShowSearchAd,clearFormFields,getRelateExchangeInfo} = contentStore;
        return [
            (<Button type="primary" onClick={()=>{getRelateExchangeInfo();setShowSearchAd(false);}}>搜索</Button>),
            (<Button type="ghost" onClick={()=>{clearFormFields();}}>重置</Button>),
            (<Button type="ghost" onClick={()=>{setShowSearchAd(false)}}>取消</Button>)
        ];
    }
    pageNoChange=(index)=>{
        const {contentStore} = this.props;
        const {getRelateExchangeInfo} = contentStore;
        getRelateExchangeInfo({pageIndex:index});
    }
}

