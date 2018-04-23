import {WeaTop,WeaTools,WeaErrorPage,WeaRightMenu,WeaSearchGroup,WeaFormItem,WeaSelect,WeaInput} from "ecCom"
import { Button ,Switch,InputNumber,Spin} from "antd";
import Dragula from 'react-dragula';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx"
// import {testForm} from "./cpt1Form/formTest"
import WeaCptDragula from './comp/weaCptDragula'

@inject('capital1Store')
@observer
class Capital1 extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {capital1Store} = this.props;
        capital1Store.initData();
    }

    render(){
        const {capital1Store} = this.props;
        const {cptDatas,formloading,condition} = capital1Store;
        const {codeType,cptGroupFlow,cptTypeFlow,modifyStartCode,startCode} = cptDatas;
        // console.log("www",testForm)
        const style = {
            height:"50px",lineHeight:"50px"
        }
        //{/* {this.getFormItems()} */}
        return (
            <WeaRightMenu datas={this.getRightMenu()}  >
                <WeaTop
                    title={"资产资料编码设置"}
                    loading={true}
                    icon={<i className='icon-coms-fa' />}
                    iconBgcolor='#f14a2d'
                    buttons={this.getButtons()}
                    buttonSpace={10}
                    showDropIcon={true}
                    dropMenuDatas={this.getRightMenu()}
                >
                    <WeaSearchGroup title="编码方式" fontSize={14} needTigger={true} showGroup={true}>
                        <WeaFormItem label="编码方式" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                            <WeaSelect
                                options={[
                                    {key: '1', selected: false, showname: '自动编码'},
                                    {key: '2', selected: false, showname: '手动编码'}
                                ]}
                                value={codeType}
                                style={{width: '100px'}}
                                onChange={value => this.onChange({codeType:value})}
                            />
                        </WeaFormItem>
                    </WeaSearchGroup>
                    <div style = {{display:`${codeType == "1" ? "block":"none"}`}}>
                        <WeaSearchGroup title="编号组成" fontSize={14} needTigger={true} showGroup={true}>
                        <WeaCptDragula 
                            container=".container"
                            canDrag={(clickDom) => jQuery(clickDom).hasClass("icon-coms-move")}
                            datas={toJS(condition)}
                            getKeyFromData={this.getRowKey}
                            getKeyFromDom={this.getKeyFromDom}
                            onDrop={this.onDrop}
                        >
                        <Spin  spinning={formloading}>

                            <div className='container'>
                            {this.getFormItems()}
                                
                                  {
                                      /*
                                        <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />资产组编号</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <Switch
                                            checked={'1'}
                                            onChange={checked => this.onChange({needRefresh: checked ? '1' : '0'})}
                                        />
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />资产类型编号</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <Switch
                                            checked={'1'}
                                            onChange={checked => this.onChange({needRefresh: checked ? '1' : '0'})}
                                        />
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />字母</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <WeaInput />
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />流水号位数</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <InputNumber min={0}  precision={0}/>
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />字符串一</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <WeaInput />
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />字符串二</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <WeaInput />
                                    </WeaFormItem>
                                    <WeaFormItem className="cpt-formitem-move" label={<span><span className="icon-coms-move cpt-cursor-pointer" />字符串三</span>} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                        <WeaInput />
                                    </WeaFormItem>
                                      */
                                  }
                            </div>
                            </Spin>
                            </WeaCptDragula>
                        </WeaSearchGroup>
                        <WeaSearchGroup title="流水规则" fontSize={14} needTigger={true} showGroup={true}>
                            <WeaFormItem label="资产组单独流水" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                <Switch
                                    checked={cptGroupFlow == "1"}
                                    onChange={checked => this.onChange({cptGroupFlow: checked ? '1' : '0'})}
                                />
                            </WeaFormItem>
                            <WeaFormItem label="资产类型单独流水" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                <Switch
                                    checked={cptTypeFlow == "1"}
                                    onChange={checked => this.onChange({cptTypeFlow: checked ? '1' : '0'})}
                                />
                            </WeaFormItem>
                            <WeaFormItem label="修改起始编号" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                <Switch
                                    checked={modifyStartCode == "1"}
                                    onChange={checked => this.onChange({modifyStartCode: checked ? '1' : '0'})}
                                />
                            </WeaFormItem>
                            {
                                modifyStartCode == "1" && 
                                <WeaFormItem label="起始编号" labelCol={{span: 6}} wrapperCol={{span: 16}}>
                                    <InputNumber min={0} defaultValue={startCode} precision={0} onChange={(value)=>this.onChange({startCode:value})} />
                                </WeaFormItem>
                            }
                        </WeaSearchGroup>
                        <WeaSearchGroup title="预览" fontSize={14} needTigger={true} showGroup={true}>
                            <div style={{marginLeft:30}}>
                                {/* {this.showCodeView()} */}
                                <table className="cpt-code-table-container" cellspacing="0" cellpadding="0">
                                    <tr>{this.showCodeView()}</tr>
                                </table>
                            </div>
                        </WeaSearchGroup>
                    </div>
                </WeaTop>
            </WeaRightMenu>
        )
    }
    getRightMenu(){
        let btns = [];  
         btns.push({
             icon: <i className='icon-coms-Approval '/>,
             content:'保存',
             key:"1",
             onClick:(key)=>alert(1)
         }); 
         return btns
    }
    getButtons(){
        let btnArr = [];
        btnArr.push(<Button type="primary" onClick={()=>{console.log(1)}}>保存</Button>);
        return btnArr
    }
    // initDragula = (container) => {
    //     this.drake = Dragula([container], {
    //         isContainer: function (el) {
    //           return false;
    //         },
    //         moves: (el, source, handle, sibling) => {
    //             return true
    //           },
    //         mirrorContainer: container
    //       });
    //       this.drake.on("drop",(el, target, source, sibling) => {
    //           console.log(el,  target,sibling);
    //         //   console.log(jQuery("div[class^='cpt-move-index-']",target))
    //           this.getKeyFromDom(el)
    //       })
    // }
    getKeyFromDom = (dom) => {
        // console.log(jQuery(".icon-coms-move",dom).attr("data-index"))
        return jQuery(".icon-coms-move",dom).attr("data-index");
    }
    getRowKey = (record, index) => {
        // console.log(record.id)
        // const rowKey = this.props.rowKey;
        // if (typeof rowKey === 'function') {
        //   return rowKey(record, index);
        // }
        return typeof record['id'] !== 'undefined' ? record['id'] : index;
    }
    onDrop = (datas) => {
        console.log(datas)
        const {capital1Store} = this.props;
        capital1Store.saveTempCondition(datas);
        //  isFunction(this.props.onDrop) && this.props.onDrop(datas);
    }
    onChange=(value)=>{
        const {capital1Store} = this.props;
        capital1Store.changeCodeType(value)
    }
    getFormItems=()=>{
        const {capital1Store} = this.props;
        const {form,condition} = capital1Store;
        let items = [];
        condition.length>0 && toJS(condition).map((fields,index) =>{
            let dom;
            if(fields.conditionType == "SWITCH"){  
                dom = <Switch
                    checked={form.$(fields.domkey[0]).values() == "1"}
                    onChange={checked => form.$(fields.domkey[0]).value = checked ? '1' : '0'}
                />  
            }else if(fields.conditionType == "INPUTNUMBER"){
                dom = <InputNumber min={0}  precision={0} defaultValue={form.$(fields.domkey[0]).values()} onChange={v => form.$(fields.domkey[0]).value = v }/>
            }else{
                dom = <WeaInput defaultValue={form.$(fields.domkey[0]).values()} onChange={v => form.$(fields.domkey[0]).value = v }/>
            }
            items.push(<div   className = {"cpt-move-index"}>
                <WeaFormItem
                    className = {"cpt-formitem-move"}
                    label={<span><span data-index={fields.id} className="icon-coms-move cpt-cursor-pointer" />{`${fields.label}`}</span>}
                    labelCol={{span: `${fields.labelcol}`}}
                    wrapperCol={{span: `${fields.fieldcol}`}}>
                    {dom}
                </WeaFormItem></div>)
        });
        return items;  
    }
    showCodeView(){
        const {capital1Store } = this.props;
        const {tempCondition,form} = capital1Store;
        var colors= new Array ("#6633CC","#FF33CC","#666633","#CC00FF","#996666")  ;
        let group = [];
        tempCondition.length>0 && toJS(tempCondition).map((item,index)=>{
            let dom ;
            if(item.conditionType.toUpperCase() == "SWITCH"){
                if(form.$(item.domkey[0]).values() == "0"){
                    return ""
                }else{
                    dom = <tbody>
                        <tr><td><font color={colors[index%5]}>{item.label}</font></td></tr>
                        <tr style={{height:"1px"}}><td style={{borderTop:"1px solid #000"}}></td></tr>
                        <tr><td><font color={colors[index%5]}>{"****"}</font></td></tr>
                    </tbody>
                }
            }else if(item.conditionType.toUpperCase() == "INPUTNUMBER"){
                dom = <tbody>
                    <tr><td><font color={colors[index%5]}>{item.label}</font></td></tr>
                    <tr style={{height:"1px"}}><td style={{borderTop:"1px solid #000"}}></td></tr>
                    <tr><td><font color={colors[index%5]}>{this.createFlowNum(form.$(item.domkey[0]).values())}</font></td></tr>
                </tbody>
            }else{
                dom = <tbody>
                    <tr><td><font color={colors[index%5]}>{item.label}</font></td></tr>
                    <tr style={{height:"1px"}}><td style={{borderTop:"1px solid #000"}}></td></tr>
                    <tr><td><font color={colors[index%5]}>{form.$(item.domkey[0]).values()}</font></td></tr>
                </tbody>
            }
            group.push(<td><table className="cpt-code-table" cellspacing="0" cellpadding="0"> {dom} </table></td>)
        })
        return group
    }
    createFlowNum=(num)=>{
        let str = "";
        if(Number(num) <= 0){
            str ="***"
        }else if(Number(num) == 1){
            str = 1
        }else{
            for(let i=0;i<Number(num)-1;i++){
                str += 0;
            }
            str +="1"
        }
        return str
    }
}

export default WeaTools.tryCatch(React,
    props => <WeaErrorPage msg={ props.error ? props.error : '对不起，该页面异常，请联系管理员！'} />,
    {error: ""}
)(Capital1);