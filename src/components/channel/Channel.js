import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from '../Header';
import firebaseApp from '../../firebaseConfig';

class Channel extends Component {

  state = { 
    newMessage: '',
    name: ''
  };

  componentDidMount() {
    this.getName();
    this.scrollToBottom();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    const messageContainer = ReactDOM.findDOMNode(this.messageContainer);
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (this.state.newMessage.trim() !== '' && this.state.newMessage.trim() !== ' ') {
      this.props.onSubmit(this.state.newMessage.trim(), this.props.channelID);
      this.setState({ newMessage: '' });
    }
  }

  getName = () => {
    var ref = firebaseApp.database().ref("channels");
    var query = ref.orderByKey().equalTo(this.props.channelID);
    query.once("value",(snapshot) => {
      snapshot.forEach((child) => {
        this.setState({ name: child.val().name });
      });
    });
  }

  render() {
    return (
      <div id="Channel" className="container">
        <Header>
          <Link to='/channel'>
            <i className="fa fa-arrow-left mt-3" aria-hidden="true" style={{fontSize: '24px'}}></i>
          </Link>
          <p className="user-name">#{this.state.name}</p>
        </Header>
        <div 
          id="message-container"
          ref={element => {
            this.messageContainer = element;
          }}
        >
          {
            this.props.messages.map(msg => {
              if (msg.des_user_id === this.props.channelID) {
                return (
                  <div 
                    key={msg.id} 
                    className={`msg_container mb-3 ${this.props.user.email === msg.author && 'mine'}`}
                  >
                    <span className="message">{msg.msg}</span>
                    <p>{msg.author}</p>
                  </div>
                );
              }
            })
          }
        </div>
        <div className="input-group mb-2 mt-1">
          <input 
            type="text" 
            className="mess-input form-control" 
            placeholder="Add your message" 
            aria-label="Add your message" 
            aria-describedby="button-addon2"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.newMessage} 
          />
          <div className="input-group-append">
            <button 
              className="send btn btn-primary"
              type="button" 
              id="button-addon2"
              onClick={this.handleSubmit}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Channel;
