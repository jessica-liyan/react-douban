import React from 'react'
import './pagination.scss'

export class Pagination extends React.Component{
  constructor (props) {
    super(props)
    console.log('props.current', props.current)
    this.state = {
      current: this.props.current || 1 // 当前页码
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      current: props.current
    })
  }

  prev(){
    this.setState((prevState) => ({
      current: prevState.current > 1 ? prevState.current - 1 : 1
    }))
    // 触发父级更新
    setTimeout(()=>{
      this.props.onChange(this.state.current)
    }, 0)
  }

  next(){
    this.setState((prevState) => ({
      current: prevState.current < this.n ? prevState.current + 1 : this.n
    }))
    // 触发父级更新
    setTimeout(()=>{
      this.props.onChange(this.state.current)
    }, 0)
  }

  handleClick (item) {
    this.setState({
      current: item
    })
    // 触发父级更新
    setTimeout(()=>{
      this.props.onChange(this.state.current)
    }, 0)
  }

  renderList () {
    this.n = Math.ceil(this.props.total/(this.props.pageSize)) // 总页数
    const pages = []
    if (this.n <= 7) {
      this.showPrevMore = false
      this.showNextMore = false
      for(let i = 2; i <= this.n-1; i++){
        pages.push(i)
      }
    } 
    else {
      if(this.state.current >= this.n - 3){
        this.showPrevMore = true
        this.showNextMore = false
        for(let i = this.n - 5; i <= this.n - 1; i++){
          pages.push(i)
        }
      }else if(this.state.current < this.n - 3 && this.state.current > 4){
        this.showPrevMore = true
        this.showNextMore = true
        for(let i = this.state.current - 2; i <= this.state.current + 2; i++){
          pages.push(i)
        }
      }else if(this.state.current <= 4){
        this.showPrevMore = false
        this.showNextMore = true
        for(let i = 2; i <= 6; i++){
          pages.push(i)
        }
      }
    }
    return (
      <ul className="pagination-list">
        <li className={this.state.current === 1 ? 'btn active' : 'btn'}
          onClick={this.handleClick.bind(this, 1)}>1</li>
        <li className={this.showPrevMore ? 'btn': 'btn hide'}>...</li>
        {
          pages.map((item, index) => (
            <li key={index}
              className={this.state.current === item ? 'btn active' : 'btn'}
              onClick={this.handleClick.bind(this, item)}
            >{item}</li>
          ))
        }
        <li className={this.showNextMore ? 'btn': 'btn hide'}>...</li>
        <li className={this.n === 1 ? 'btn hide' : (this.state.current === this.n ? 'btn active' : 'btn')}
          onClick={this.handleClick.bind(this, this.n)}>{this.n}</li>
      </ul>
    )
  }

  render () {
    return (
      <div className="pagination">
        <div>{this.state.current}</div>
        <a className="btn" onClick={this.prev.bind(this)}>上一页</a>
        {this.renderList()}
        <a className="btn" onClick={this.next.bind(this)}>下一页</a>
      </div>
    )
  }
}