import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from './Header';
import SignupContainer from './SignupContainer';
import firebaseApp from '../firebaseConfig';
import firebase from 'firebase';

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: "",
      showModal: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleLoginFacebook = this.handleLoginFacebook.bind(this);
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleShowModal = () => {
    this.setState({ showModal: true })
  }

  login() {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.props.history.push('/'); // Login success then redirect to '/'
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          alert('Your username or password is incorrect. Please try again');
          this.setState({ error: 'Error logging in' });
        }
      })
  } 

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: '' });
    if (this.state.email && this.state.password) {
      this.login();
    } else {
      this.setState({ error: 'Please fill in both fields' });
    }
  }

  handleLoginFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithRedirect(provider)
      .then(this.authFacebookHandler);
  }

  authFacebookHandler = async authData => {
    const user = authData.user;
    console.log(user);
  };

  render() {
    return (
      <div id="LoginContainer" className="container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              onChange={this.handleEmailChange}
              value={this.state.email}
              required
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
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

          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>

          <button type="submit" className="btn btn-primary mr-3">Submit</button>
          <button type="button" className="btn btn-primary" onClick={() => this.handleLoginFacebook()}>Login with Facebook</button>
        </form>
        <p className="mt-3"><Button className="px-0" variant="link" onClick={() => this.handleShowModal()}>Don't have an account ? Create one</Button></p>
        <Modal show={this.state.showModal} onHide={() => this.handleCloseModal()}>
          <SignupContainer />
        </Modal>
      </div>
    );
  }
}

export default LoginContainer;
