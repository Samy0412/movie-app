import React from "react";

//style and animation
import styled from "styled-components";

//components
import NominationList from "./NominationList";
import { IoSearchOutline } from "react-icons/io5";

function Nav({
  searchValue,
  setSearchValue,
  nominationList,
  handleNominatesClick,
  movies,
}) {
  //Update the results when the search terms change
  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Stylednav>
      <Header>
        <Logo>
          <img src=".././img/shopify__white.svg" alt="logo" />
          <h3>The shoppies</h3>
        </Logo>
        <NominationList
          nominationList={nominationList}
          handleNominatesClick={handleNominatesClick}
        />
      </Header>
      {movies.length === 0 && (
        <Info>
          Shopify has branched out into movie award shows and we need your vote.
          Search for movies and select your 5 favorites!
        </Info>
      )}

      <div className="search-bar">
        <IoSearchOutline size="30px" />
        <input
          type="text"
          onChange={inputHandler}
          value={searchValue}
          placeholder="Search a movie title"
          autoFocus
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
  /* border: 2px solid red; */

  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgb(192, 164, 96);
    border-bottom: solid 1px rgb(192, 164, 96);
    @media screen and (max-width: 700px) {
      width:80%;
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
    @media screen and (max-width: 700px) {
      width:60vw;
  }
    ::placeholder {
      color: rgb(192, 164, 96);
      font-size: 1.2rem;
    }
    @media screen and (max-width: 700px) {
      ::placeholder {
        font-size: 0.8rem;
      }
    }
  }
`;

const Logo = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 2rem;
    width: 2rem;
  }
  h3 {
    color: white;
    padding-top: 0.5rem;
  }
`;
const Info = styled.div`
  color: rgb(192, 164, 96);
  font-size: 1.4rem;
  font-weight: 300;
  width: 55%;
  padding-top: 10rem;
  height: 50vh;
  /* border: solid 2px green; */
  @media screen and (max-width: 700px) {
    padding-top: 8rem;
    font-size: 1.1rem;
    width: 90%;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
`;
export default Nav;
