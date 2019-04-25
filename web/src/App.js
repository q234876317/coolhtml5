import React,{Component} from 'react';
import './App.css';
import ItemContainer from './component/itemcontainer'
import request from "./request";
import {FILESERVER} from './config'

export default class App extends  Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    Promise.all([request({
      url: '/news/all',
      method: 'get'
    }), request({
      url: '/category/all',
      method: 'get'
    })]).then(([res, resCategory]) => {
      let {data: categories} = resCategory
      categories.forEach((item, i) => {
        item.key = i + 1
      })
      let {data: list} = res
      list = list.map((item) => {
        let res_item = {
          id: item.id,
          title: item.title,
          des: item.des,
          logo: FILESERVER + item.logo,
          url:item.url,
        }
        let cur_category = categories.find(item_c => item_c.id === item.category_id) || {key: 0, name: '其他'}
        res_item.tag = cur_category.name
        res_item.tag_type = cur_category.key
        return res_item
      })
      this.setState({
        list
      })
    })
  }

  render() {
    return (
        <div className="container">
          <ItemContainer list={this.state.list}/>
        </div>
    )
  }
}
