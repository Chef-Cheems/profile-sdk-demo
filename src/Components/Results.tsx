import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import TeamContainer from "./TeamContainer";
import UnregisteredUsers from "./UnregisteredUsers";

const ResultsContainer = styled.div`
  display: grid;
  width: 100%;
  @media screen and (min-width: 986px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Results = () => {
  const { teams } = useContext(AppContext);

  return (
    <>
      <UnregisteredUsers />
      <ResultsContainer>
        {teams.map((team) => (
          <TeamContainer team={team} key={team.id} />
        ))}
      </ResultsContainer>
    </>
  );
};

export default Results;
