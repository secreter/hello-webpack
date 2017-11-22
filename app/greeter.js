
// var config = require('./config.json');module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// };
import React,{Component} from 'react'
import config from './config.json'
class Greeter extends Component{
	constructor(props){
		super(props)
		this.env='production'
		if(process.env.NODE_ENV==='development'){
			this.env='development'
		}
	}
	render(){
		return (
			<div>
			{this.env}
			{config.greetText}
			</div>
			)
	}
}

export default Greeter