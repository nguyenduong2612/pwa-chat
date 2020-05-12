import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import firebaseApp from '../firebaseConfig';
import './ChatContainer.css';

class ChatContainer extends Component {
  state = { 
    newMessage: '' 
  };

  componentDidMount() {
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

  handleLogout = () => {
    firebaseApp.auth().signOut();
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
    this.props.onSubmit(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  render() {
    return (
      <div id="ChatContainer" className="container">
        <Header>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </Header>
        <div 
          id="message-container"
          ref={element => {
            this.messageContainer = element;
          }}
        >
          {
            this.props.messages.map(msg => (
              <div 
                key={msg.id} 
                className={`msg_container mb-3 ${this.props.user.email === msg.author && 'mine'}`}
              >
                <span className="message">{msg.msg}</span>
                <Link className="author" to={`/users/${msg.user_id}`}>{msg.author}</Link>
              </div>
            ))
          }
        </div>
        <div className="input-group mb-2 mt-1">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Add your message" 
            aria-label="Add your message" 
            aria-describedby="button-addon2"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.newMessage} 
          />
          <div className="input-group-append">
            <button 
              className="btn btn-primary"
              type="button" 
              id="button-addon2"
              onClick={this.handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
