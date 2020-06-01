import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import firebaseApp from '../firebaseConfig';
import Select from 'react-select';
import './ChatContainer.css';

class AllUserContainer extends Component {
  state = {
    users: [],
    selectedOption: null
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('userEmails/')
      .on('value', snapshot => {
        this.getAllUsers(snapshot);
      });
  }

  getAllUsers = snapshot => {
    const users = Object.keys(snapshot.val()).map(key => {
      const user = snapshot.val()[key];
      user.id = key;
      return user;
    });
    this.setState({ users });
  }

  handleLogout = () => {
    firebaseApp.auth().signOut();
  }

  handleSearchChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => {
        console.log(`Option selected:`, this.state.selectedOption)
        this.props.history.push(`/users/${selectedOption.value}`)
      }
    );
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div id="AllUserContainer" className="container">
        <Header>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </Header>
        <Select
            isSearchable
          value={selectedOption}
          onChange={this.handleSearchChange}
          options={this.state.users.map(user => ({
            value: user.uid,
            label: user.email
          }))}
        />
        {/* <div id="message-container">
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
        </div> */}
      </div>
    );
  }
}

export default AllUserContainer;
