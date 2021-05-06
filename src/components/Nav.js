import React, { useState } from "react";
//Animation
import styled from "styled-components";
// import { motion } from "framer-motion";
// import { fadeIn } from "../utils/animations";

function Nav({ searchValue, setSearchValue }) {
  // const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };
  // const submitHandler = (e) => {
  //   setTextInput("");
  //   e.preventDefault();
  // };

  const clearSearch = () => {};

  return (
    <Stylednav>
      <Logo>
        {/* <img src=".././img/logo.svg" alt="logo" /> */}
        <h1>Ignite</h1>
      </Logo>
      <input
        autoFocus
        type="text"
        onChange={inputHandler}
        value={searchValue}
      />
    </Stylednav>
  );
}

const Stylednav = styled.nav`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
    border-radius: 0px 10px 10px 0px;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
`;
export default Nav;
