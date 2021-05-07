import React, { useState } from "react";

//style
import styled from "styled-components";

//components
import NominationList from "./NominationList";
import { IoSearchOutline } from "react-icons/io5";

function Nav({
  searchValue,
  setSearchValue,
  nominationList,
  handleNominatesClick,
}) {
  //Update the results when the search terms change
  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Stylednav>
      <Header>
        <Logo>
          <img src=".././img/logo.png" alt="logo" />
        </Logo>
        <NominationList
          nominationList={nominationList}
          handleNominatesClick={handleNominatesClick}
        />
      </Header>
      <div className="search-bar">
        <IoSearchOutline size="30px" />
        <input
          type="text"
          onChange={inputHandler}
          value={searchValue}
          placeholder="Search a movie title"
        ></input>
      </div>
    </Stylednav>
  );
}

const Stylednav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;

  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgb(192, 164, 96);
    border-bottom: solid 1px rgb(192, 164, 96);
  }
  input {
    width: 40vw;
    height: 3rem;
    font-size: 1.5rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    background: transparent;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    color: rgb(192, 164, 96);
    outline: none;
    ::placeholder {
      color: rgb(192, 164, 96);
      font-size: 1.2rem;
    }
  }
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    height: 15rem;
    width: 15rem;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
export default Nav;
