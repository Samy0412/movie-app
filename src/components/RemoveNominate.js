import React from "react";
//Styling and animation
import styled from "styled-components";

function RemoveNominate() {
  return (
    <>
      <Text>X Remove from list</Text>
    </>
  );
}
const Text = styled.p`
  background-color: rgb(0, 0, 0);
  width: 100%;
  height: 3rem;
  padding-top: 0.3rem;
  color: rgba(192, 164, 96, 1);
  font-size: 1.5rem;
  font-weight: 500;
  transition: ease-in 0.2s;
  opacity: 0.6;
  :hover {
    opacity: 0.8;
    transition: ease-in 0.2s;
  }
`;
export default RemoveNominate;
