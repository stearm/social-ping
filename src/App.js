import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as uuid from "uuid";

import ItalyMap from "./components/ItalyMap";
import Chat from "./components/Chat";
import Overlay from "./components/Overlay";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const App = ({ socketConnection }) => {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition(position);
    });
  }, []);

  const handleTextChange = event => {
    setMessage(event.target.value);
  };

  const onSend = () => {
    if (position) {
      socketConnection.emit("new_msg", {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        message: {
          text: message,
          id: uuid.v4()
        }
      });
    }

    setMessage("");
  };

  return (
    <div style={{ height: "100%" }}>
      <Overlay isVisible={!position} text={"Obtaining your position..."} />
      <Overlay mobile={true} text={"Mobile version not available :("} />
      <Wrapper>
        <ItalyMap socketConnection={socketConnection} />
        <Chat socketConnection={socketConnection} text={message} handleTextChange={handleTextChange} onSend={onSend} />
      </Wrapper>
    </div>
  );
};

export default App;
