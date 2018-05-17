import React from 'react'
import {searchMovie} from '../../api/movie'
import {getImage} from '../../api/index'
import {Pagination} from '../pagination/pagination'

export class MovieSearch extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      q: '营救',
      page: 1
    }
    this.pageSize = 10
    this.search = this.search.bind(this)
  }

  componentDidMount(){
    // 刷新页面，需要更新state，重新渲染
    this.setState({
      q: this.getParams(this.props.location.search, "q"),
      page: this.getParams(this.props.location.search, "page")
    }, () => {
      this.search(this.state.page)
    }) 
  }

  getParams (url, x) {
    let newurl = url.replace('?', '').split('&').map(t => t.split('=')).find(arr => arr[0] === x)
    if(newurl){
      return newurl[1]
    }
  }

  onChange (e) {
    this.setState({
      q: e.target.value
    })
  }

  // 数据请求
  search (start = 1) {
    searchMovie(this.state.q, (start - 1)  * this.pageSize, this.pageSize).then(res => {
      console.log(res.data)
      this.setState({
        list: res.data.subjects,
        total: res.data.total
      })
    })
  }

  //点击搜索
  handleClick () {
    this.updatePage(1)
  }

  // 监听分页组件页码改变
  handleChange (i) {
    this.updatePage(i)
  }

  // 页码改变。1.更新当前页码。2.重新获取列表数据（list）。3.重新渲染分页组件。2.更新url
  updatePage(i){
    this.setState({
      page: i
    }, () => {
      this.search(i)
      this.props.history.push({
        pathname: '/main/movie_search',
        search: `?q=${this.state.q}&page=${i}`
      })
    }) 
  }

  // 详情页
  goDetail (id) {
    this.props.history.push(`/main/movie/${id}`)
  }

  renderList () {
    if(!this.state.list.length){
      return <div className="loading"></div>
    }
    return (
      <ul className="block">
        {
          this.state.list.map((item) => (
            <li key={item.id} onClick={this.goDetail.bind(this, item.id)}>
              <div className="detail">
                <img src={getImage(item.images.small)} alt="" style={{width: '80px'}}/>
                <div className="detail-info">
                  <h3>{item.title}</h3> 
                  <p>{item.genres.join('/')}/{item.year}</p>
                  <p>{item.casts.map(x => x.name).join('/')}</p>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    )
  }

  renderPage () {
    if(!this.state.total){
      return null
    }
    return (
      <Pagination current={Number(this.state.page)} total={this.state.total} pageSize={this.pageSize} onChange={this.handleChange.bind(this)}/>
    )
  }

  render () {
    return (
      <div>
        <div className="search">
          <input type="text" onChange={this.onChange.bind(this)} value={this.state.q}/>
          <a onClick={this.handleClick.bind(this)}><img src={require('../../img/search.png')} alt=""/></a>
        </div>
        {this.renderList()}
        {this.renderPage()}
      </div>
    )
  }
}