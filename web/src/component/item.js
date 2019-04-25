import React,{Component} from 'react';
import QrCode from 'qrcode.react'
import PropTypes from 'prop-types'

export default class Item extends Component{
    render() {
        return (<a className="item" href={this.props.url}>
            <div className="item-info">
                <div className="logo"><img alt='' src={this.props.logo}/></div>
                <div className="title">{this.props.title}</div>
            </div>
            <div className="hid"></div>
            <div className="qr-code">
                <QrCode size={120} value={this.props.url}/>
            </div>
        </a>)
    }
}
Item.propTypes={
    title:PropTypes.string,
    logo:PropTypes.string,
    url:PropTypes.string,
    tag:PropTypes.string,
    tag_type:PropTypes.number,
}
Item.defaultProps= {
    title: '',
    logo: '',
    url: '',
    tag:'',
    tag_type:0
}
