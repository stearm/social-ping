import React, { Component } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;

const MessagesContainer = styled.div`
  max-width: 750px;
  overflow: hidden;
  padding: 10px 10px;
  margin-top: 25px;
  font-family: 'Cousin', monospace;
  text-align: center;
  min-height: 450px;
`;

const SendButton = styled.button`
  margin-top: 4px;
`;

const ChatTextArea = styled.textarea`
  height: 25%;
  width: 100%;
  border-radius: 5px;
  resize: none;
`;

const CHAT_LENGTH = 15;

export default class Chat extends Component {

  static _getRandomColor () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[ Math.floor(Math.random() * 16) ];
    }
    return color;
  }

  constructor (props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount () {

    // in order to mantain the colors instead of change it for each rendering
    // it was saved in the state and when a new message come in it will be merged with the current state


    this.props.socketConnection.on('msg', (data) => {

      if (this.state.messages.length === CHAT_LENGTH) {
        this.setState({
          messages: this.state.messages.slice(1).concat([
            {
              id: data.message.id,
              text: data.message.text,
              color: Chat._getRandomColor()
            }
          ])
        });
      } else {
        this.setState({
          messages: this.state.messages.concat([
            {
              id: data.message.id,
              text: data.message.text,
              color: Chat._getRandomColor()
            }
          ])
        });
      }

    });

  }

  render () {
    return (
      <ChatContainer>
        <MessagesContainer>
          {
            this.state.messages.map(msg =>
              <p key={msg.id} style={{ color: msg.color }}>{msg.text}</p>
            )
          }
        </MessagesContainer>
        <div style={{ marginTop: '50px' }}>
          <h2>Say something to your friends!</h2>
          <ChatTextArea onChange={this.props.handleTextChange} value={this.props.text} maxLength={150}/>
          <SendButton onClick={this.props.onSend}>Send message</SendButton>
        </div>
      </ChatContainer>
    )
  }

}