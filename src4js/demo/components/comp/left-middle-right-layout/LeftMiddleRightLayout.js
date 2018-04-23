import { Icon} from 'antd';
import cloneDeep from 'lodash/cloneDeep'
import './style/index.less'


class LeftMiddleRightLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLeft:props.defaultShowLeft || true,
            isHover:false,
            leftWidth:props.leftWidth || 500,
            treeWidth:props.treeWidth || 250
            // showRight:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.showRight !== nextProps.showRight){
            this.showright(nextProps.showRight);
        }
    }
    leftShowCo(e){
        const {showLeft,leftWidth,treeWidth} = this.state;
        const { onLeftChange,leftCom} = this.props;
        if(showLeft){
           jQuery(".three-side-left").animate({width:0},300,"linear",onLeftChange && onLeftChange(false))
        }else{
            jQuery(".three-side-left").animate({width:leftCom? leftWidth:treeWidth},300,"linear",onLeftChange && onLeftChange(true))
        }
    	this.setState({showLeft:!showLeft});
    	e.stopPropagation();
    	e.preventDefault();
    	e.nativeEvent.preventDefault();
    }
    render() {
        const {showLeft,height,isHover,leftWidth,treeWidth} = this.state;
        const {children,leftCom,rightCom,showRight} = this.props;
        return (
            <div className="wea-left-middle-right-layout" >
                <div className="three-side-left" style={{width:leftCom ? leftWidth :treeWidth}}>
                   {
                    leftCom &&
                    <div style={{width:treeWidth}} className="three-side-left-left1" >
                        {leftCom}
                    </div>
                   }
                    <div style={{width:treeWidth}} className="three-side-left-left2">
                        {rightCom}
                    </div>
                </div>
                <div   className="three-side-right">
                    <div className='wea-three-side-layout-show-left'
                        onClick={this.leftShowCo.bind(this)}
                        onMouseEnter={()=>this.setState({isHover:true})}
                        onMouseLeave={()=>this.setState({isHover:false})}
                        style={{background: `url('/cloudstore/images/e9/leftTree-${showLeft ? "show" : "hide"}${isHover ? "-hover" : ""}.png') no-repeat -2px 0`}}
                    ></div>
                    <div className="three-side-right-container">
                        <div style={{background:"#fff",height:"100%"}}>
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeftMiddleRightLayout;