import React, { Component } from 'react';
import Header from '../Header';
import firebaseApp from '../../firebaseConfig';

import './Profile.css';

class Profile extends Component {

	handleLogout = () => {
    firebaseApp.auth().signOut();
	}
	
	render() {
		return (
			<div id="Profile" className="container">
        <Header>
          <div className="profile-header">
						<img src={'./logo192.png'} alt="Logo" />
						<h3 className="my-name-profile">{this.props.email}</h3>
					</div>
        </Header>
        
				<button type="button" className=" mt-4 btn btn-outline-danger profile-component" onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
      </div>
		);
	}

}

export default Profile;
