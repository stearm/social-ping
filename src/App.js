import React, { Component } from 'react';
import styled from 'styled-components';
import * as uuid from 'uuid';

import ItalyMap from './components/ItalyMap'
import Chat from './components/Chat'
import Overlay from './components/Overlay';

const Container = styled.div`
      display: flex;
      height: 100%;
    `;

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ position })
    });
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  onSend = function () {
    const position = this.state.position;
    const text = this.state.text;

    if (position) {
      this.props.socketConnection.emit('new_msg', {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        message: {
          text,
          id: uuid.v4()
        }
      });
    }

    this.setState({ text: '' });
  }

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Overlay isVisible={!this.state.position} text={"Obtaining your position..."}/>
        <Overlay mobile={true} text={"Mobile version not available :("}/>
        <Container>
          <ItalyMap socketConnection={this.props.socketConnection}/>
          <Chat
            socketConnection={this.props.socketConnection}
            text={this.state.text}
            handleTextChange={this.handleTextChange.bind(this)}
            onSend={this.onSend.bind(this)}
          />
        </Container>
      </div>
    );
  }
}

export default App;
