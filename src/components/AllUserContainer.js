import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import firebaseApp from '../firebaseConfig';
import './ChatContainer.css';

class AllUserContainer extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('userEmails/')
      .on('value', snapshot => {
        this.getAllUsers(snapshot);
      });
  }

  handleLogout = () => {
    firebaseApp.auth().signOut();
  }

  getAllUsers = snapshot => {
    const users = Object.keys(snapshot.val()).map(key => {
      const user = snapshot.val()[key];
      user.id = key;
      return user;
    });
    this.setState({ users });
  }

  render() {
    return (
      <div id="AllUserContainer" className="container">
        <Header>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </Header>
        <div id="message-container">
          {
            this.state.users.map(user => (
              <div 
                key={user.id} 
                className={`msg_container mb-3`}
              >
                <Link className="user" to={`/users/${user.uid}`}>{user.email}</Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default AllUserContainer;
