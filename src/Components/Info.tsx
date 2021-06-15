import React from "react";
import styled from "styled-components";
import { Flex, Box, Text } from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";

const MediaLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  margin: 0 4px;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

const Info = () => {
  return (
    <Flex flexDirection={["column", "column", "column", "row"]} mb="8px">
      <Flex flex="3" flexDirection="column">
        <Box mb="8px">
          Enter your (or your friend's) address to see profile info such as team
          membership, points, achievements and more!
        </Box>
        <Box mb="8px">
          This page is a demo of upcoming PancakeSwap Profile SDK package.
          Integrate PancakeSwap profiles into your project today!
        </Box>
      </Flex>
      <Flex flex="1" justifyContent="flex-end">
        <MediaLink href="https://github.com/pancakeswap">
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <Text fontSize="12px">Source code</Text>
        </MediaLink>

        <MediaLink href="https://github.com/pancakeswap">
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <Text fontSize="12px">Profile SDK</Text>
        </MediaLink>

        <MediaLink href="https://www.npmjs.com/package/@pancakeswap/profile-sdk">
          <FontAwesomeIcon icon={faNpm} size="2x" />
          {/* spacer for logos without text to be in line with each other */}
          <Box height="18px" />
        </MediaLink>
      </Flex>
    </Flex>
  );
};

export default Info;
