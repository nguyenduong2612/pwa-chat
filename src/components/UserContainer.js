import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class ChatContainer extends Component {
  render() {
    return (
      <div id="UserContainer" className="container">
        <Header>
          <Link to='/'>
            <button type="button" className="btn btn-danger">Back to chat</button>
          </Link>
        </Header>
        <h2>Hello from UserContainer for {this.props.match.params.id} </h2>
      </div>
    );
  }
}

export default ChatContainer;
