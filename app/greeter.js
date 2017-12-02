
// var config = require('./config.json');module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };
import React, {Component} from 'react'
import config from './config.json'
import Gun from 'gun'
class Greeter extends Component {
  constructor (props) {
    super(props)
    this.state = {
    	msg: [''],
    	value: ''
    }
    this.env = 'production'
    if (process.env.NODE_ENV === 'development') {
      this.env = 'development'
    }
    this.gun = Gun('http://item.redream.cn:8080/gun')
    window.gun = this.gun // To have access to gun object in browser console
  }
  componentDidMount () {
  	gun.get('msgList').on((data, key) => {
		 // {property: 'value'}, 'key'
		 if (key == 'msgList') {
			 	this.setState({
	  		msg: [data.list]
	  	})
		 }
		 console.log(data)
  })
  }

  render () {
    return (
      <div>
        <input onChange={this.handleChange.bind(this)} />
        <button onClick={this.addMsg.bind(this)}>添加</button>
        {this.env}
        {config.greetText}
        {this.state.msg.map((item, i) => {
        	return <p key={i}>{item}</p>
        })}
      </div>
    )
  }
  handleChange (e) {
  	this.setState({
  		value: e.target.value
  	})
  }
  addMsg (e) {
  	let msg = this.state.msg
  	msg.push(this.state.value)
  	this.gun.get('msgList').put({'list': this.state.value})
  }
}

export default Greeter
