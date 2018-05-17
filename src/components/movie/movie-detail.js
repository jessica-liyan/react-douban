import React from 'react'
import {getMovieDetail} from '../../api/movie'
import {getImage} from '../../api/index'
import './movie.scss'

export class MovieDetail extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount(){
    getMovieDetail(this.props.match.params.id).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data
      })
    })
  }

  render () {
    const {data} = this.state
    if(JSON.stringify(data) == "{}"){
      return <div className="loading"></div>
    }
    return (
      <div>
        <div className="detail">
          <img src={getImage(data.image)} alt=""/>
          <div className="detail-info">
            <h3>{data.title}</h3>
            <p><em>别名：</em><i>{data.alt_title}</i></p>
            <p><em>主演：</em><i>{data.attrs.cast.join('/')}</i></p>
            <p><em>导演：</em><i>{data.attrs.director.join('/')}</i></p>
            <p><em>上映城市：</em><i>{data.attrs.country.join('/')}</i></p>
            <p><em>上映日期：</em><i>{data.attrs.pubdate.join('/')}</i></p>
            <p><em>语言：</em><i>{data.attrs.language.join('/')}</i></p>
            <p><em>时长：</em><i>{data.attrs.movie_duration.join('/')}</i></p>
            <p><em>类型：</em><i>{data.attrs.movie_type.join('/')}</i></p>
            <p><em>简介：</em><i>{data.summary}</i></p>
          </div>
        </div>
      </div>
    )
  }
}