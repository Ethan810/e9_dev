import { Card,Pagination  } from 'antd';
import {WeaPopoverHrm} from 'ecCom'
import equals from 'deep-equal'

class ExchangeLogs extends React.Component{
    constructor(props) {
		super(props);
        this.state={
            page:props.page || 1
        }
	}
    shouldComponentUpdate(nextProps,nextState) {
        if(!equals(this.props.data, nextProps.data)){
            this.setState({page:1})
        }
        return  !equals(this.props.data, nextProps.data)||
        !equals(this.state.page,nextState.page);
    }
    render(){
        const {page} = this.state;
        const {data=[],totalSize=0} = this.props;
        return (
            <div className="prj-view-contactlog">
                <WeaPopoverHrm />
                {this.getCards(page)}
                {
                    Number(totalSize)>0 ?
                    <div className="prj-pagination"><Pagination defaultCurrent={1}  total={totalSize} onChange={this.changePageSize}/></div>
                    :<div className="crm-no-datas-show">没有可显示的数据</div>
                }
            </div>
        )
    }
    getCards(page){
        const {data} = this.props;
        let cards = [];
        data.map((item,index)=>{
            if(index>=(10*Number(page)-10) && index<= (10*Number(page)-1)){
                 cards.push( <Card className="view-contactlog-card" key={index}>
                    <div className="card-left"><img src={item.createrimg} /></div>
                    <div className="card-right">
                        <div className="card-right-hrm"><span dangerouslySetInnerHTML={{__html:item.creatername}}></span>&nbsp;&nbsp;{item.createdate} {item.createtime}</div>	
                        <div className="feedbackrelate">
                            <div dangerouslySetInnerHTML={{__html:item.remark}}></div>
                            {item.docids && <div className="relatetitle">相关文档:&nbsp;<span dangerouslySetInnerHTML={{__html:item.docids}}></span></div>}
                            {item.requestids && <div className="relatetitle">相关流程:&nbsp;<span dangerouslySetInnerHTML={{__html:item.requestids}}></span></div>}
                            {item.crmids && <div className="relatetitle">相关客户:&nbsp;<span dangerouslySetInnerHTML={{__html:item.crmids}}></span></div>}
                            {item.projectids && <div className="relatetitle">相关项目:&nbsp;<span dangerouslySetInnerHTML={{__html:item.projectids}}></span></div>}
                            {item.tskids && <div className="relatetitle">相关任务:&nbsp;<span dangerouslySetInnerHTML={{__html:item.tskids}}></span></div>}
                            {item.accessory && <div className="relatetitle">相关附件:&nbsp;<span dangerouslySetInnerHTML={{__html:item.accessory}}></span></div>}
                    
                        </div>
                    </div>
                    <div className="clear"></div>
                </Card>)
            }
        });
        return cards;
    }
    changePageSize=(page)=>{
        this.setState({page:page});
        typeof this.props.onChange === 'function' && this.props.onChange(page);
    }
}

export default ExchangeLogs;