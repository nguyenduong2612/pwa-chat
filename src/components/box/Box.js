import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../../firebaseConfig';
import './Box.css'


class Box extends Component {
	
	state = { 
    lastMess: ''
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
			.orderByChild('timestamp')
      .on('value', snapshot => {
        var messages = Object.keys(snapshot.val()).map(key => {
					const msg = snapshot.val()[key];
					msg.id = key;
					if ((msg.user_id === this.props.myId && msg.des_user_id === this.props.user.uid) || 
							(msg.user_id === this.props.user.uid && msg.des_user_id === this.props.myId)) {
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
		if (this.state.lastMess) {
			box = <Link className="box" to={`/users/${this.props.user.uid}`}>
							<img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" width="40" />
							<div className="d-inline-block ml-2">
								<span className="box-user-name">{this.props.user.email}</span>
								<span className="user-last-msg">{this.state.lastMess}</span>
							</div>	
						</Link>
		}
		return (
			<div id="Box">{box}</div>
		);
	}
}

export default Box;
