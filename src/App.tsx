import React, { useContext } from "react";
import styled from "styled-components";
import { Flex } from "./Components/Layout";
import { Spinner } from "./Components/Spinner";
import Heading from "./Components/Heading";
import SearchInput from "./Components/SearchInput";
import Results from "./Components/Results";
import Info from "./Components/Info";
import { AppContext } from "./AppContext";

const AppContainer = styled.div`
  margin: 0 auto;
  width: 95%;
  min-height: 100vh;
`;

const App: React.FC = () => {
  const { teamsLoading } = useContext(AppContext);
  return (
    <AppContainer>
      {teamsLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          width="100%"
        >
          <Spinner />
        </Flex>
      ) : (
        <>
          <Heading title="PancakeSwap Profile SDK Demo" />
          <Info />
          <SearchInput />
          <Results />
        </>
      )}
    </AppContainer>
  );
};

export default App;
