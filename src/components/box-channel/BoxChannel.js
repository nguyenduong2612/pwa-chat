import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../../firebaseConfig';

class BoxChannel extends Component {
	
	state = { 
    lastMess: 'Welcome to #'+ this.props.channel.name + ' !'
  };
	
	componentWillMount() {
    this.getLastMess();
	}

	// handleClick = () => {
	// 	this.props.history.push(`/users/${this.props.user.uid}`)
	// }
	
	getLastMess = () => {
		firebaseApp
		.database()
		.ref('messages/')
		.on('value', snapshot => {
			var messages = Object.keys(snapshot.val()).map(key => {
				const msg = snapshot.val()[key];
				msg.id = key;
				if (msg.des_user_id === this.props.channel.uid) {
					return msg.msg;
				}
			});

			messages = messages.filter(function (el) {	//remove undefined messages
				return el != undefined;
			});

			//console.log(messages)

			messages.map((msg, index) => {
				if (index == messages.length-1)
					this.setState({lastMess: msg});
			});
		})
	}

	render() {
		var box;
			box = <Link className="box" to={`/channels/${this.props.channel.uid}`}>
							<img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/bubbles-alt-512.png" width="40" />
							<div className="d-inline-block ml-2 pl-1">
								<span className="box-user-name">{this.props.channel.name}</span>
								<span className="user-last-msg">{this.state.lastMess}</span>
							</div>	
						</Link>
		return (
			<div id="Box">{box}</div>
		);
	}
}

export default BoxChannel;
