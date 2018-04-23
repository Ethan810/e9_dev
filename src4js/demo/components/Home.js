import { WeaPopoverHrm } from 'ecCom';


class Home extends React.Component {
    render() {
        return (
            <div style={{height:"100%"}}>
            <WeaPopoverHrm  />
                <iframe id="hiddenPreLoaderSingle" name="hiddenPreLoaderSingle" style={{display: "none"}} width="0" height="0" border="0" frameborder="0"></iframe>
                {this.props.children}
            </div>
        )
    }
}

export default Home


