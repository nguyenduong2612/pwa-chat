import React, { Component } from 'react';
import firebaseApp from '../firebaseConfig';

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
        error: 'Please fill in both fields'
      });
    } else {
      this.signup();
    }
  }

  signup() {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        // signup successful
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Error signup' });
      })
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h3 className='card-header bg-primary text-white mb-4 pl-4'>Sign up now</h3>
        <div className="form-group mx-4">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            onChange={this.handleEmailChange}
            value={this.state.email}
            required
          />
        </div>

        <div className="form-group mx-4">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="exampleInputPassword1"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            required
          />
        </div>

        <div className="form-group mx-4">
          <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="exampleInputConfirmPassword1"
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirm_password}
            required
          />
        </div>
        
        <div className='center-button mx-4'>
            <button className="btn btn-primary submit-button mb-4" value="submit">Sign up</button>
        </div>
      </form>
    );
  }
}

export default SignupContainer;
