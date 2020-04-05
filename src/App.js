import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
import ChatContainer from './components/ChatContainer';
import UserContainer from './components/UserContainer';
import firebaseApp from './firebaseConfig';
import './App.css';

class App extends Component {
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login')
      };
    })
  }

  render() {
    return (
      <div className="inner-container">
        <Route path='/login' component={LoginContainer}/>
        <Route exact path='/' component={ChatContainer}/>
        <Route exact path='/users/:id' component={UserContainer}/>
      </div>
    );
  }
}

export default withRouter(App);
