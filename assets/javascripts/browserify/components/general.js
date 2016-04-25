import $ from 'jQuery'
import React from 'React'
import ReactDOM from 'react-dom'


let index = 0;

var Item = React.createClass({
	render: function(){
		var self = this
		var listItem = this.props.data.map(function(item){
			return(
				<div key={item.id}>{item.name} <button data-id={item.id} onClick={self.props.deletey}>X</button></div>
			)
		})
		return(
			<div>{listItem}</div>
		)
	}
})

var Todo = React.createClass({
	render: function(){
		return(
			<div>
				<h1>My List</h1>
				<Item data={this.state.list} deletey = {this.removeItem} />
				<input type="text" id="listInput" />
				<button id="listInputButton" onClick={this.addItem}>GO</button>
			</div>
		)
	},
	addItem: function(){
		let array = this.state.list;
		let value = $('#listInput').val();
		array.push({name : value, id : index++})
		this.setState({list: array})
	},

	removeItem: function(e){
		var id = parseInt($(e.currentTarget).data('id'), 10);

		this.setState(state => {
			state.list.splice(id, 1);
			return {list:state.list};
		})

	},

	getInitialState: function(){
		return{
			list: []
		}
	},

	componentWillMount: function(){

	}
})

ReactDOM.render(<Todo />, document.getElementById('home'));