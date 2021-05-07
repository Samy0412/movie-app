import React, { useEffect } from "react";

//style
import styled from "styled-components";

//Chakra-UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function Banner({ nominationList }) {
  //To manage the chakra-ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Opens a banner when 5 movies have been nominated
  useEffect(() => {
    if (nominationList.length === 5) {
      onOpen();
    }
  }, [nominationList]);

  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={"lg"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HeaderStyled>
            <img src=".././img/wreath-gold.png" alt="logo" />
            <img src=".././img/wreath-gold.png" alt="logo" />
            <img src=".././img/wreath-gold.png" alt="logo" />
            <img src=".././img/wreath-gold.png" alt="logo" />
            <img src=".././img/wreath-gold.png" alt="logo" />
          </HeaderStyled>
        </ModalHeader>
        {/* <ModalCloseButton _focus={{ outline: "none" }} /> */}
        <ModalBody>
          Congrats! you have completed your selection!
          <br />
          If you wish to change your selection please remove movies from your
          list.
        </ModalBody>
        <ModalFooter>
          <Button
            backgroundColor="rgb(192, 164, 96)"
            _focus={{ outline: "none" }}
            _hover={{ backgroundColor: "rgb(192, 164, 96)", opacity: 0.8 }}
            onClick={onClose}
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
const HeaderStyled = styled.div`
  display: flex;
  width: 50%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  img {
    width: 1.7rem;
  }
`;
export default Banner;
