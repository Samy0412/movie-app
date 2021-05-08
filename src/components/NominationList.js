import React from "react";

//style
import styled from "styled-components";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

//Components
import MovieList from "./MovieList";

function NominationList({ nominationList, handleNominatesClick }) {
  //Set up for Chakra UI drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        aria-label="nominationList"
        onClick={onOpen}
        color="white"
        backgroundColor="transparent"
        _focus={{ outline: "none" }}
        _hover={{ backgroundColor: "transparent", opacity: 0.7 }}
        _active={{ backgroundColor: "transparent" }}
      >
        <ButtonStyled>
          <img src=".././img/award.png" alt="logo" />
          <p>My list ({nominationList.length})</p>
        </ButtonStyled>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{ outline: "none" }} />
          <DrawerHeader>
            <Title>
              <img src=".././img/wreath-black.png" alt="logo" />
              <p> My nomination list</p>
            </Title>
          </DrawerHeader>
          <DrawerBody>
            <MovieList
              movies={nominationList}
              handleNominatesClick={handleNominatesClick}
              nominationList={nominationList}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

//Styled components
const ButtonStyled = styled.div`
  display: flex;
  width: 5.5rem;
  justify-content: space-between;
  align-items: center;
  img {
    width: 1.7rem;
    margin-right: 0.5rem;
  }
  p {
    font-weight: 400;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.9rem;
    margin-right: 0.5rem;
  }
  p {
    font-weight: 600;
  }
`;
export default NominationList;
