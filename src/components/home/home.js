import React from 'react'
import {Link} from 'react-router-dom'
import {getMovieInTheater, getMovieInComing} from '../../api/movie'
import {getImage} from '../../api/index'
import './home.scss'

export class Home extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      movie: [],
      start: 0
    }
  }

  componentDidMount () {
    getMovieInTheater('武汉', 0, 10).then(res => {
      console.log(res.data.subjects)
      this.setState({
        movie: res.data.subjects
      })
    })
  }

  goDetail (id) {
    this.props.history.push(`${this.props.match.url}/movie/${id}`)
  }

  fetchData () {
    if (!this.state.movie.length) {
      return <div className="loading"></div>
    }
    return <ul className="swipe-list">
      {
        this.state.movie.slice(this.state.start, this.state.start + 3).map((item,index) => (
          <li key={item.id} onClick={this.goDetail.bind(this, item.id)}>
            <img src={getImage(item.images.small)} alt=""/>
            <p>{item.title}</p>
          </li>
        ))
      }
    </ul>
  }
  
  prev(){
    this.setState({
      start: this.state.start > 0 ? this.state.start - 1 : 0
    })
  }

  next(){
    this.setState({
      start: this.state.start + 1
    })
  }

  renderList () {
    return <div className="swipe">
      <button onClick={this.prev.bind(this)}><img src={require('../../img/left.png')} alt=""/></button>
      {this.fetchData()}
      <button onClick={this.next.bind(this)}><img src={require('../../img/right.png')} alt=""/></button>
    </div>
  }

  render () {
    return (
      <div>
        <h2 className="title">电影<Link to="/main/movie" className="more">更多></Link></h2>
        {this.renderList()}
      </div>
    )
  }
}