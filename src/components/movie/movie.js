import React from 'react'
import {Link} from 'react-router-dom'
import {MovieList} from './movie-list'

export class Movie extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  
  onInput (e) {
    this.setState({
      input: e.target.value
    })
  }

  render () {
    return (
      <div>
        <div className="search">
          <input type="text" onInput={this.onInput.bind(this)}/>
          <Link to={{pathname:`/main/movie_search`, search: `?q=${this.state.input}`}}><img src={require('../../img/search.png')} alt=""/></Link>
        </div>
        <MovieList title="正在热映" {...this.props}/>
        <MovieList title="即将上映" {...this.props}/>
      </div>
    )
  }
}