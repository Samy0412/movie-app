import React from "react";
//Styling and animation
import styled from "styled-components";

function AddNominate() {
  return (
    <>
      <Text>+ Add to List</Text>
    </>
  );
}

const Text = styled.p`
  border: 1px solid white;
  border-radius: 1.5rem;
  padding: 0.3rem 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: ease-in 0.2s;
  :hover {
    opacity: 0.6;
    transition: ease-in 0.2s;
  }
`;
export default AddNominate;
