import { Modal,Row, Col, Button,Icon,Menu,} from 'antd';
import {Dropdown} from 'mode-coms'

const Item = Menu.Item
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import isString from 'lodash/isString';
import './style/index.css'

class Main extends React.Component {
    static defaultProps = {
        style: {width: 520, height: 400},
        icon: 'icon-coms-ModelingEngine',
        maskClosable: false,
        closable: true,
        title: 'Dialog',
        iconBgcolor: '#2db7f5',
        isallscreen:false,
        hasMoreBtn:false
    }
    static contextTypes = {
        router: React.PropTypes.routerShape
    }
    listenRouter(){
        this.context.router.listen(nextState => {
            const { path } = this.state;
            const { pathname } = nextState;
            if(path !== pathname){
                this._reactInternalInstance !== undefined && this.setState({path:pathname, visible:false});
            }
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalBody: '',
            title: props.title || '',
            url: props.url || '',
            style: props.style,
            icon: props.icon,
            closable: props.closable,
            buttons: props.buttons,
            maskClosable: props.maskClosable,
            iconBgcolor: props.iconBgcolor,
            path: window.location.hash && window.location.hash.split('#/')[1].split('?')[0],
            isallscreen:false,
            hasMoreBtn:props.hasMoreBtn || false,
            dropMenuDatas:props.dropMenuDatas || [],
            showDrop:false
        }
        this.onCancel = this.onCancel.bind(this);
    }
    componentWillReceiveProps(nextProps){


        if (this.props.visible !== nextProps.visible || this.state.visible !== nextProps.visible) {
            this.setState({visible: nextProps.visible});
        }
        if (this.props.url !== nextProps.url) {
            this.setState({url: nextProps.url});
        }
        // if (!WeaTools.isEqual(this.props.style, nextProps.style)) {
        //     this.setState({style: nextProps.style});
        // }
        if ('buttons' in this.props) {
            this.setState({buttons: nextProps.buttons});
        }
        if (this.props.title !== nextProps.title) {
            this.setState({title: nextProps.title});
        }
        // if (this.props.icon !== nextProps.icon) {
        //     this.setState({icon: nextProps.icon});
        // }
        // if (this.props.iconBgcolor !== nextProps.iconBgcolor) {
        //     this.setState({iconBgcolor: nextProps.iconBgcolor});
        // }
    }
    shouldComponentUpdate(...args) {
        return true
       // return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    componentDidMount(){
        this.listenRouter();
        window.initExtendDialog = params => {
            let state = {};
            if (params.style) {
                state.style = params.style;
            }
            if (params.buttons) {
                state.buttons = params.buttons;
            }
            if (params.url) {
                state.url = params.url;
            }
            if (params.modalBody) {
                state.modalBody = params.modalBody;
            }
            if (params.title) {
                state.title = params.title;
            }
            if (params.icon) {
                state.icon = params.icon;
            }
            if (params.closable !== undefined) {
                state.closable = params.closable;
            }
            if (params.maskClosable !== undefined) {
                state.maskClosable = params.maskClosable;
            }
            if (params.iconBgcolor) {
                state.iconBgcolor = params.iconBgcolor;
            }
            if(params.hasMoreBtn){
                state.hasMoreBtn = params.hasMoreBtn
            }
            if(params.dropMenuDatas){
                state.dropMenuDatas = params.dropMenuDatas
            }
            this.setState(state);
        }
        window.showExtendDialog = () => {
            this.setState({visible: true});
        }
        window.closeExtendDialog = () => {
            this.onCancel();
        }
    }
    onCancel() {
        this.setState({visible: false});
        this.props.onCancel && this.props.onCancel();
    }
    toAllScreen=()=>{
        const screenH = window.document.documentElement.clientHeight || window.body.clientHeight;

        this.setState({
            style:{width:"100%",height:screenH-100},
            isallscreen:true
        });
        jQuery('.extend-dialog .ant-modal').addClass('extend-dialog-allscreen') 
    }
    claseAllScreen=()=>{
    //    let e = window.event;
    //    e.stopPropagation()
    //    e.preventDefault();
        this.setState({
            style:this.props.style,
            isallscreen:false
        });
        jQuery('.extend-dialog .ant-modal').removeClass('extend-dialog-allscreen')
    }
    getFooterButtons(){
        const {buttons,dropMenuDatas,hasMoreBtn,showDrop} = this.state;
        let newButtons = [];
        const menu = dropMenuDatas ?
        <Menu mode='vertical' onClick={o => {if(typeof this.props.onDropMenuClick == 'function') this.props.onDropMenuClick(o.key)}}>
    		{
    			dropMenuDatas.map((d, i)=> {
        			return <Item key={d.key || i} disabled={d.disabled}>
        				<span className='extend-dialog-menu-icon'>{d.icon}</span>
        				{d.content}
        			 </Item>
    		})}
    	</Menu> : '';
        if(hasMoreBtn){
            newButtons.push(<span style={{position:"relative"}}>
            <span className="extend-dialog-menu" onMouseLeave={()=>this.setState({showDrop:false})} style={{display:showDrop ? "block":"none"}}>
                <div className="extend-right-menu-icon-background"></div>
                {menu}</span>
                <Button onClick={()=>this.setState({showDrop:!showDrop})}>更多<i className="icon-coms-Browse-box-Add-to" style={{marginLeft:"5px"}}/>
                <i className="icon-coms-Browse-box-Add-to" style={{marginLeft:"-5px"}} /></Button>
           </span>)
        }
        return [...buttons,...newButtons]
        
    }
    render(){
        const {children, hideIcon = false} = this.props;
        const {modalBody, visible, url, closable, style, maskClosable, buttons, title, icon, iconBgcolor,isallscreen,hasMoreBtn,dropMenuDatas} = this.state;
        let titleEle = (
            <Row>
                <Col span="18" style={{paddingLeft:20,lineHeight:'48px'}}>
                    <div>
                        {
                            !hideIcon &&
                            <div className="wea-browser-single-icon-circle" style={{background: iconBgcolor}}>
                                <i className={icon}/>
                            </div>
                        }
                        <span style={{verticalAlign:'middle'}}>{title}</span>
                    </div>
                </Col>
                <Col span="6"  style={{paddingRight:10,lineHeight:'48px',textAlign:"right"}}>
                    <div>
                    {
                        isallscreen ? <span onClick={this.claseAllScreen} className="extend-dialog-header-icon" style={{cursor:"pointer",color:"#999"}}> <Icon type="shrink" /></span>:
                        <span onClick={this.toAllScreen} className="extend-dialog-header-icon" style={{cursor:"pointer",color:"#999"}}> <Icon type="arrow-salt" /></span>
                    }
                        <span onClick={this.onCancel} className="extend-dialog-header-icon" style={{cursor:"pointer",color:"#999",marginLeft:"-5px"}}> <Icon type="cross" /></span>
                    </div>
                </Col>
            </Row>
        );
        let body;
        if (modalBody) {
            body = modalBody;
            if (isString(modalBody)) body = <div  dangerouslySetInnerHTML={{__html: modalBody}}></div>
        }
        
        return (
            <Modal
                wrapClassName={`extend-dialog ${this.props.className}`}
                zIndex={this.props.zIndex}
                title={titleEle}
                width={style.width}
                closable={false}
                maskClosable={maskClosable}
                visible={visible}
                onCancel={this.onCancel}
                footer={this.getFooterButtons()}
            >
                <div className="extend-dialog-body" style={{height: style.height}}>
                    {children ? children : ''}
                    {body}
                    {url?
                        <iframe src={url} height={style.height - 20} width={style.width}>
                        </iframe>
                        : ''
                    }
                </div>
            </Modal>
        )
    }
}
export default Main;