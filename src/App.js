import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
import ChatContainer from './components/ChatContainer';
import UserContainer from './components/UserContainer';
import firebaseApp from './firebaseConfig';
import './App.css';

class App extends Component {
  state = {
    user: null,
    messages: []
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login')
      };
    });
    firebaseApp
      .database()
      .ref('messages/')
      .on('value', snapshot => {
        this.onMessage(snapshot);
      })
  }

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
  }

  handleSubmitMessage = (msg) => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    firebaseApp
      .database()
      .ref('messages/')
      .push(data);
    console.log(msg);
  }

  render() {
    return (
      <div className="inner-container">
        <Route path='/login' component={LoginContainer}/>
        <Route 
          exact 
          path='/' 
          render={() => (
            <ChatContainer 
              onSubmit={this.handleSubmitMessage}
              user={this.state.user}
              messages={this.state.messages}
            />
          )}
        />
        <Route
          exact 
          path='/users/:id' 
          render={({history, match}) => (
            <UserContainer 
              messages={this.state.messages}
              userID={match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
