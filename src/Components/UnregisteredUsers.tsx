import React, { useContext, useState } from "react";
import styled from "styled-components";
import { bunnyPlaceholder } from "@pancakeswap/profile-sdk";
import { Flex, Box, Text } from "./Layout";
import BSCLink from "./BSCLink";
import { AppContext } from "../AppContext";

const UnregisteredUsersContainer = styled.div`
  width: 100%;
  padding: 8px;
  background-color: white;
  margin-bottom: 8px;
`;

const UnregisteredHeading = styled(Flex)`
  cursor: pointer;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
`;

const UnregisteredUsers: React.FC = () => {
  const { getUnregisteredUsers } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const unregisteredUsers = getUnregisteredUsers();
  if (unregisteredUsers.length === 0) {
    return null;
  }
  return (
    <Flex justifyContent="center" width="100%">
      <UnregisteredUsersContainer>
        <UnregisteredHeading
          justifyContent="space-between"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <Text>Unregistered ({unregisteredUsers.length})</Text>
          <Text pr="20px">▼</Text>
        </UnregisteredHeading>

        {expanded ? (
          <>
            <Text fontSize="14px">
              These addresses do not have PancakeSwap profile:
            </Text>
            <Flex flexWrap="wrap" mr="4px">
              {unregisteredUsers.map((user) => (
                <Flex key={user.address} alignItems="center" mt="8px" mr="8px">
                  <img
                    src={bunnyPlaceholder}
                    alt="unregistered user"
                    width="42px"
                  />
                  <Box ml="8px">
                    <BSCLink
                      href={`https://bscscan.com/address/${user.address}`}
                    >
                      {user.address}
                    </BSCLink>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </>
        ) : null}
      </UnregisteredUsersContainer>
    </Flex>
  );
};

export default UnregisteredUsers;
