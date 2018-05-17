import React from 'react'
import {HashRouter as Router, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'
import {Home} from '../home/home'
import {Movie} from '../movie/movie'
import {MovieDetail} from '../movie/movie-detail'
import {MovieSearch} from '../movie/movie-search'
import {Book} from '../book/book'
import './main.scss'

export class Main extends React.Component{
  constructor (props) {
    super(props)
  }

  render () {
    return ( 
      <Router>
        <div className="app">
          <div className="app-nav">
            <div className="mid">
              <div>
                <NavLink to={`${this.props.match.url}`} exact>首页</NavLink>
                <NavLink to={`${this.props.match.url}/movie`} exact>电影</NavLink>
                <NavLink to={`${this.props.match.url}/book`} exact>图书</NavLink>
              </div>
              <div>
                <Link to="/login">退出</Link>
              </div>
            </div>
          </div>
          <div className="app-main">
            <div className="mid">
              <Switch>
                <Route path={`${this.props.match.url}`} exact render={props => <Home {...props}/>}/>
                <Route path={`${this.props.match.url}/movie`} exact render={props => <Movie {...props}/>}/>
                <Route path={`${this.props.match.url}/movie/:id`} exact render={props => <MovieDetail {...props}/>}/>
                <Route path={`${this.props.match.url}/movie_search`} exact render={props => <MovieSearch {...props}/>}/>
                <Route path={`${this.props.match.url}/book`} render={props => <Book {...props}/>}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}