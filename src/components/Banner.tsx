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
  useDisclosure,
  Button,
} from "@chakra-ui/react";

//Types
import { BannerProps } from "../types";

function Banner({ nominationList }: BannerProps) {
  //To manage the chakra-ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Opens a banner when 5 movies have been nominated
  useEffect(() => {
    if (nominationList.length === 5) {
      onOpen();
    }
  }, [nominationList, onOpen]);

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
        <ModalBody>
          <BodyStyled>
            Congrats! you have nominated 5 movies!
            <br />
            If you wish to change your selection please remove movies from your
            list.
          </BodyStyled>
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

//Styled components
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

const BodyStyled = styled.div`
  padding: 0rem 2rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
export default Banner;