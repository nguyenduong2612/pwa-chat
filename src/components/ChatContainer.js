import React,{ Component } from 'react';
import Header from './Header';
import firebaseApp from '../firebaseConfig';

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
        <h2>Hello from ChatContainer</h2>
      </div>
    );
  }
}

export default ChatContainer;
