import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;

const MessagesWrapper = styled.div`
  max-width: 750px;
  overflow: hidden;
  padding: 10px 10px;
  margin-top: 25px;
  font-family: "Cousin", monospace;
  text-align: center;
  min-height: 450px;
`;

const SendButton = styled.button`
  margin-top: 8px;
  border-radius: 5px;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  background-color: #eaf2ff;
`;

const ChatTextArea = styled.textarea`
  height: 25%;
  width: 100%;
  border-radius: 5px;
  resize: none;
`;

const CHAT_LENGTH = 15;

const _getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Chat = ({ socketConnection, handleTextChange, text, onSend }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketConnection.on("msg", data => {
      if (messages.length === CHAT_LENGTH) {
        setMessages(messages =>
          messages.slice(1).concat([
            {
              id: data.message.id,
              text: data.message.text,
              color: _getRandomColor()
            }
          ])
        );
      } else {
        setMessages(messages =>
          messages.concat([
            {
              id: data.message.id,
              text: data.message.text,
              color: _getRandomColor()
            }
          ])
        );
      }
    });

    return () => socketConnection.close();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatWrapper>
      <MessagesWrapper>
        {messages.map(msg => (
          <p key={msg.id} style={{ color: msg.color }}>
            {msg.text}
          </p>
        ))}
      </MessagesWrapper>
      <div style={{ marginTop: "50px" }}>
        <h2>Say something to your friends!</h2>
        <ChatTextArea onChange={handleTextChange} value={text} maxLength={150} />
        <SendButton onClick={onSend}>Send message</SendButton>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
