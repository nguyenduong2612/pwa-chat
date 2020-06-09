import React, { Component } from 'react';
import firebaseApp from '../../firebaseConfig';

import './SignupContainer.css';

class SignupContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      error: ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleConfirmPasswordChange(e) {
    this.setState({confirm_password: e.target.value});
  }

  handleSubmit(e) {
    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        password: "",
        confirm_password: "",
        error: 'Password and confirm password does not match'
      });
      alert('Password and confirm password does not match');
    } else {
      this.signup();
    }
  }

  signup() {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(data) {
        console.log("User " + data.user.uid + " created successfully!");
        const user = {
          email: data.user.email,
          uid: data.user.uid
        };
        firebaseApp
          .database()
          .ref('userEmails')
          .push(user);
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          alert(err.message);
          this.setState({ error: 'Error signup' });
        }
      })
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h3 className='card-header bg-primary text-white text-center mb-5 pl-4'>Sign up now</h3>
          <div className="form-group mx-4">
            <input 
              type="email" 
              className="login-form-control form-control" 
              id="exampleInputEmail1" 
              onChange={this.handleEmailChange}
              value={this.state.email}
              placeholder="Email address"
              required
            />
          </div>

          <div className="form-group mx-4">
            <input 
              type="password" 
              className="login-form-control form-control" 
              id="exampleInputPassword1"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group mx-4">
            <input 
              type="password" 
              className="login-form-control form-control" 
              id="exampleInputConfirmPassword1"
              onChange={this.handleConfirmPasswordChange}
              value={this.state.confirm_password}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <div className='center-button mx-4'>
              <button id="signup-btn" className="btn btn-primary submit-button mb-5" value="submit">Sign up</button>
          </div>
      </form>
    );
  }
}

export default SignupContainer;
