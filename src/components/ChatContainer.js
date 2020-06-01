import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import firebaseApp from '../firebaseConfig';
import './ChatContainer.css';

class ChatContainer extends Component {
  handleLogout = () => {
    firebaseApp.auth().signOut();
  }

  render() {
    return (
      <div id="ChatContainer" className="container">
        <Header>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </Header>
        <div id="message-container">
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
      </div>
    );
  }
}

export default ChatContainer;
