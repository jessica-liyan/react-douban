import React from 'react'
import {getMovieInTheater, getMovieInComing} from '../../api/movie'
import {getImage} from '../../api/index'
import './movie.scss'

export class MovieList extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      movie: []
    }
  }

  componentDidMount(){
    if(this.props.title === '正在热映'){
      getMovieInTheater('武汉', 0, 10).then(res => {
        console.log(res.data.subjects)
        this.setState({
          movie: res.data.subjects
        })
      })
    }else{
      getMovieInComing(0, 10).then(res => {
        console.log(res.data.subjects)
        this.setState({
          movie: res.data.subjects
        })
      })
    } 
  }

  goDetail (id) {
    this.props.history.push(`${this.props.match.url}/${id}`)
  }

  renderList () {
    if(!this.state.movie.length){
      return <div className="loading"></div>
    }
    console.log('获取到了', this.props.title)
    return <ul className="list">{
      this.state.movie.map((item,idx) => {
        return <li key={item.id} onClick={this.goDetail.bind(this, item.id)}>
          <div className="list-info">
            <p className="img"><img src={getImage(item.images.small)} alt=""/></p>
            <p className="txt">{item.title}</p>
          </div>
        </li>
      })
    }</ul>
  }

  render () {
    return (
      <div>
        <h2 className="title">{this.props.title}</h2>
        {this.renderList()}
      </div>
    )
  }
}