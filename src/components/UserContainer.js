import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './ChatContainer.css';

class UserContainer extends Component {
  renderedUserEmail = false;

  getAuthor = (author) => {
    if (!this.renderedUserEmail) {
      this.renderedUserEmail = true;
      return <p className="author">{author}</p>
    }
  };

  render() {
    return (
      <div id="UserContainer" className="container">
        <Header>
          <Link to='/'>
            <button type="button" className="btn btn-danger">Back to chat</button>
          </Link>
        </Header>
        <div id="message-container">
          {
            this.props.messages.map(msg => {
              if (msg.user_id === this.props.userID) {
                return (
                  <div 
                    key={msg.id} 
                    className="msg_container"
                  >
                    {this.getAuthor(msg.author)}
                    <span className="message">{msg.msg}</span>
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}

export default UserContainer;
