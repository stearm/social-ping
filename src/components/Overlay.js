import React from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #242426;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  opacity: ${props => (props.isVisible ? 0.8 : 0)};
  transition: visibility 0s 1s, opacity 1s linear;
  @media (max-width: 768px) {
    opacity: 1;
    visibility: visible;
  }
`;

const Overlay = props => {
  return (
    <StyledOverlay isVisible={props.isVisible}>
      <div>
        <h2>{props.text}</h2>
      </div>
    </StyledOverlay>
  );
};

export default Overlay;
