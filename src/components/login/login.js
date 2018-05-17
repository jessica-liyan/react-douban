import React from 'react'
import {Redirect} from 'react-router-dom'
import './login.scss'

export class Login extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange (e) {
    if(e.target.value){
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  
  handleBlur (e) {
    if (e.target.value) {
      e.target.nextSibling.style.opacity = '0'
    }
  }

  submit () {
    // 验证用户名和密码
    // 验证成功，跳转主页面
    setTimeout(() => {
      this.props.history.push('/main')
    }, 1000) 
  }

  render () {
    return (
      <div className="login">
        <div className="login-info">
          <div className="input">
            <input type="text" name="username" onInput={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
            <span>用户名/昵称</span>
          </div>
          <div className="input">
            <input type="text" name="password" onInput={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}/>
            <span>密码</span>
          </div>
          <button className="btn" onClick={this.submit.bind(this)}>登录</button>
        </div>
      </div>
    )
  }
}