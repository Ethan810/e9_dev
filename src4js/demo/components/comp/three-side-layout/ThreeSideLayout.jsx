import { Icon} from 'antd';
import cloneDeep from 'lodash/cloneDeep'
import './style/index.less'


class WeaThreeSideLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLeft:props.defaultShowLeft || true,
            isHover:false,
            leftWidth:props.leftWidth || 250,
            rightWidth:props.rightWidth || "60%",
            // showRight:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.showRight !== nextProps.showRight){
            this.showright(nextProps.showRight);
        }
    }
    leftShowCo(e){
        const {showLeft,leftWidth} = this.state;
        const { onLeftChange} = this.props;
        if(showLeft){
           jQuery(".three-side-left").animate({width:0},"normal","linear",onLeftChange && onLeftChange(false))
        }else{
            jQuery(".three-side-left").animate({width:leftWidth},"normal","linear",onLeftChange && onLeftChange(true))
        }
    	this.setState({showLeft:!showLeft});
    	e.stopPropagation();
    	e.preventDefault();
    	e.nativeEvent.preventDefault();
    }
    showright=(bool)=>{
        const {rightWidth} = this.state;
        if(bool){
            jQuery(".three-side-right").animate({width:rightWidth},"normal","linear")
        }else{
            jQuery(".three-side-right").animate({width:0},"normal","linear")
        }
    }
    render() {
        const {showLeft,height,isHover,leftWidth,rightWidth,} = this.state;
        const {children,leftCom,rightCom,showRight} = this.props;
        return (
            <div className="wea-three-side-layout" >
                <div style={{width:leftWidth}} className="three-side-left" >
                    {leftCom}
                </div>
                <div className="three-side-middle">
                    <div className='wea-three-side-layout-show-left'
	                    onClick={this.leftShowCo.bind(this)}
	                    onMouseEnter={()=>this.setState({isHover:true})}
	                    onMouseLeave={()=>this.setState({isHover:false})}
	                    style={{background: `url('/cloudstore/images/e9/leftTree-${showLeft ? "show" : "hide"}${isHover ? "-hover" : ""}.png') no-repeat -2px 0`}}
                    ></div>
                    <div className="three-side-middle-container">{children}</div>
                </div>
                <div  className="three-side-right">
                    { rightCom}
                </div>
            </div>
        )
    }
}

export default WeaThreeSideLayout;