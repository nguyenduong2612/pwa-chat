import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
// import ChatContainer from './components/ChatContainer';
import UserContainer from './components/UserContainer';
import AllUserContainer from './components/AllUserContainer';
import NotificationResource from './resources/NotificationResource';
import firebaseApp from './firebaseConfig';
import './App.css';

class App extends Component {
  state = {
    user: null,
    messages: []
  }

  componentDidMount() {
    this.notifications = new NotificationResource(firebaseApp.messaging(), firebaseApp.database());

    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.notifications.changeUser(user);
        this.props.history.push('/');
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

  handleSubmitMessage = (msg, des_user_id) => {
    const data = {
      msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      des_user_id,
      timestamp: Date.now()
    };
    firebaseApp
      .database()
      .ref('messages/')
      .push(data);
    //console.log(msg);
  }

  render() {
    return (
      <div className="inner-container">
        <Route 
          path='/login' 
          render={(props) => (
            <LoginContainer 
              {...props}
            />
          )}
        />
        <Route 
          exact 
          path='/'
          render={(props) => (
            <AllUserContainer 
              {...props}
            />
          )}
        />
        {/* <Route 
          exact 
          path='/' 
          render={() => (
            <ChatContainer 
              onSubmit={this.handleSubmitMessage}
              user={this.state.user}
              messages={this.state.messages}
            />
          )}
        /> */}
        <Route
          path='/users/:id' 
          render={({history, match}) => (
            <UserContainer
              onSubmit={this.handleSubmitMessage} 
              messages={this.state.messages}
              user={this.state.user}
              userID={match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
