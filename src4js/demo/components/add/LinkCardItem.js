
import {Card,Icon,Popover,Button,AutoComplete,Menu,message} from 'antd';
import {WeaInputSearch,WeaTools,WeaErrorPage} from 'ecCom'
import * as mobx from 'mobx'
import isEqual from 'lodash/isEqual';

class LinkCardItem extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            width: 0
        }
    }
	componentDidMount(){
		if (!document.getElementsByClassName) {
		    document.getElementsByClassName = function (className, element) {
		        var children = (element || document).getElementsByTagName('*');
		        var elements = new Array();
		        for (var i = 0; i < children.length; i++) {
		            var child = children[i];
		            var classNames = child.className.split(' ');
		            for (var j = 0; j < classNames.length; j++) {
		                if (classNames[j] == className) {
		                    elements.push(child);
		                    break;
		                }
		            }
		        }
		        return elements;
		    };
		}
		let coms = document.getElementsByClassName('centerItem')[0];
		!!coms.offsetWidth && this.setState({width:coms.offsetWidth});
	}
	shouldComponentUpdate(nextProps,nextState) {
		const prjbean = this.props.prjbean;
		const prjbeanNext = nextProps.prjbean;
		let needrender = false;
		const _c  = !isEqual(mobx.toJS(this.props.importDataShow),mobx.toJS(nextProps.importDataShow));
	
        return !isEqual(prjbean, prjbeanNext) 
			|| this.props.iscommon !== nextProps.iscommon
			|| this.props.num !== nextProps.num
			|| this.state.width !== nextState.width;
    }
	render(){
		const {width} = this.state;
		const {prjbean,iscommon,num,actions,user} = this.props;
		const {beagenters,belongtoUsers,id,name,isview} = prjbean;

       	const colorarray = ["#55D2D4","#B37BFA","#FFC62E","#8DCE36","#37B2FF","#FF9537","#FF5E56"];
		return (
				<div className="centerItem" key={id}  >
					{iscommon && <span style={{color:colorarray[num%7],fontSize:'30px',float:'left',marginLeft:20}}><i className={'icon-New-Flow-' + (num == 9 ? '10' : ('0' + (num + 1)))} /></span>}
					<div className="fontItem" style={{'width': iscommon ? '60%':'100%'}}>
						<a onClick={this.onNewRequest.bind(this,id,'',0,0)} target="_blank" title={name}>{name}</a>
					</div>

					<div className= "imageItem" style={{"display":"none"}}>
							{!iscommon &&
								<div className='wea-add-drop-btn' >
									<Icon type={isview == "1" ?"eye-o" :""} title="预览" />
								</div>
							}
					</div>
				</div>
			   )
	}
	//新建流程
	onNewRequest(wfid,f_weaver_belongto_userid,beagenter,e){
		//计数

	}
	

	

	//流程导入
	importWf(){
		
	}
}

export default LinkCardItem

