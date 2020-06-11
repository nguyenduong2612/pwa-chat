import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Box from '../box/Box';
import firebaseApp from '../../firebaseConfig';
import Select from 'react-select';
import './ChatContainer.css';

class ChatContainer extends Component {
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
          <Link className="btn profile-btn" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link>
          {/* <button type="button" className="btn profile-btn" onClick={this.handleRedirect}><i class="fa fa-user" aria-hidden="true"></i></button> */}
          <p className="my-name">{this.props.email}</p>
        </Header>
        
        <Select
          isSearchable
          placeholder="Search"
          components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          value={selectedOption}
          onChange={this.handleSearchChange}
          options={this.state.users.map(user => ({
            value: user.uid,
            label: user.email
          }))}
        />

        <div className="box-chat mt-4">
          {this.state.users.map(user => (
            <Box 
              key={user.uid}
              user={user}
              myEmail={this.props.email}
              myId={this.props.uid}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ChatContainer;
