import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Header';
import BoxChannel from '../box-channel/BoxChannel';
import firebaseApp from '../../firebaseConfig';
import Select from 'react-select';
import { v1 as uuidv1 } from 'uuid';
import './ChannelContainer.css';

class ChannelContainer extends Component {
  state = {
    channels: [],
    channelName: "",
    showModal: false,
    selectedOption: null
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref('channels/')
      .on('value', snapshot => {
        this.getAllChannels(snapshot);
      });
  }

  getAllChannels = snapshot => {
    const channels = Object.keys(snapshot.val()).map(key => {
      const channel = snapshot.val()[key];
      channel.uid = key;
      return channel;
    });
    this.setState({ channels });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleShowModal = () => {
    this.setState({ showModal: true })
  }

  handleNameChange = (e) => {
    this.setState({channelName: e.target.value});
  }

  handleSearchChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => {
        console.log(`Option selected:`, this.state.selectedOption)
        this.props.history.push(`/channels/${selectedOption.value}`)
      }
    );
  };

  handleAddChannel = () => {
    const data = {
      uid: uuidv1(),
      name: this.state.channelName
    };
    firebaseApp
      .database()
      .ref('channels/')
      .push(data);
    console.log(data);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div id="ChannelContainer" className="container">
        <Header>
          <Link className="btn profile-btn" to={'/profile'}><i className="fa fa-user" aria-hidden="true"></i></Link>
          <p className="my-name"><span className="title">Channel</span>{this.props.email}</p>
        </Header>
        
        <div className="search-wrapper">
          <Select
            isSearchable
            placeholder="Search"
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            value={selectedOption}
            onChange={this.handleSearchChange}
            options={this.state.channels.map(channel => ({
              value: channel.uid,
              label: channel.name
            }))}
          />
        </div>
        
        <button type="button" className="btn btn-success" onClick={() => this.handleShowModal()}><i className="fa fa-plus" aria-hidden="true"></i></button>
        <Modal show={this.state.showModal} onHide={() => this.handleCloseModal()}>
          <form className='form' onSubmit={() => this.handleAddChannel()}>
            <h3 className='card-header bg-primary text-white text-left mb-4 pl-4'>Create channel</h3>
              <div className="form-group mx-4">
                <input 
                  className="form-control" 
                  onChange={this.handleNameChange}
                  value={this.state.channelName}
                  placeholder="Channel's name"
                  required
                />
              </div>
              
              <div className='center-button mx-4'>
                  <button className="btn btn-success mb-3" value="submit">Create</button>
              </div>
          </form>
        </Modal>

        <div className="box-chat mt-4">
          {this.state.channels.map(channel => (
            <BoxChannel
              key={channel.uid}
              channel={channel}
            />
          ))}
        </div>

        <div className="bottom-bar row">
          <div className="col-6 column">
            <Link className="text-gray" to={'/'}><i style={{ fontSize: "20px" }} className="fa fa-comment" aria-hidden="true"></i><p>Chat</p></Link>
          </div>
          <div className="col-6 column">
            <div><i style={{ fontSize: "20px" }} className="fa fa-comments" aria-hidden="true"></i><p>Channel</p></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelContainer;
