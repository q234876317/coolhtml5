import React,{Component} from 'react'
import Item from './item'
import PropTypes from 'prop-types'

export default class ItemContainer extends Component {
    render() {
        let items=this.props.list.map((item)=> {
            return <Item {...item} key={item.id}></Item>
        })
        return (<div className="itemContainer">
            {items}
        </div>)
    }
}
ItemContainer.propTypes ={
    list:PropTypes.array
}
ItemContainer.defaultProps = {
    list: []
}
