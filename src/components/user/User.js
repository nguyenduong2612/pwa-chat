import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from '../Header';
import firebaseApp from '../../firebaseConfig';
import './User.css';

class User extends Component {

  state = { 
    newMessage: '',
    des_user_id: '',
    username: '', 
  };

  componentDidMount() {
    this.getNameUser();
    this.scrollToBottom();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    const messageContainer = ReactDOM.findDOMNode(this.messageContainer);
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (this.state.newMessage.trim() !== '' && this.state.newMessage.trim() !== ' ') {
      this.props.onSubmit(this.state.newMessage.trim(), this.props.userID);
      this.setState({ newMessage: '' });
    }
  }

  getNameUser = () => {
    var ref = firebaseApp.database().ref("userEmails");
    var query = ref.orderByChild("uid").equalTo(this.props.userID);
    query.once("value",(snapshot) => {
      snapshot.forEach((child) => {
        this.setState({ username: child.val().email });
      });
    });
  }

  render() {
    return (
      <div id="UserContainer" className="container">
        <Header>
          <Link to='/'>
            <i className="fa fa-arrow-left mt-3" aria-hidden="true" style={{fontSize: '24px'}}></i>
          </Link>
          <p className="user-name">{this.state.username}</p>
        </Header>
        <div 
          id="message-container"
          ref={element => {
            this.messageContainer = element;
          }}
        >
          {
            this.props.messages.map(msg => {
              if ((msg.user_id === this.props.userID && msg.des_user_id === this.props.user.uid) || 
                  (msg.user_id === this.props.user.uid && msg.des_user_id === this.props.userID)) {
                return (
                  <div 
                    key={msg.id} 
                    className={`msg_container mb-3 ${this.props.user.email === msg.author && 'mine'}`}
                  >
                    <span className="message">{msg.msg}</span>
                  </div>
                );
              }
            })
          }
        </div>
        <div className="input-group mb-2 mt-1">
          <input 
            type="text" 
            className="mess-input form-control" 
            placeholder="Add your message" 
            aria-label="Add your message" 
            aria-describedby="button-addon2"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.newMessage} 
          />
          <div className="input-group-append">
            <button 
              className="send btn btn-primary"
              type="button" 
              id="button-addon2"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
