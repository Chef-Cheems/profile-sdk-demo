import React, { useContext } from "react";
import styled from "styled-components";
import { Team, teamImages } from "@pancakeswap/profile-sdk";
import { Flex, Text } from "./Layout";
import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import { AppContext } from "../AppContext";

const TeamColumn = styled(Flex)`
  padding: 10px;
  flex-direction: column;
  position: relative;
`;

const HeadingBackground = styled.img<{
  filter?: string;
  borderRadius?: string;
}>`
  left: 0;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
  z-index: -1;
`;

const TeamLogo = styled.img`
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 9px 30px 3px rgba(0, 0, 0, 0.5);
`;

const TeamContainer: React.FC<{ team: Team }> = ({ team }) => {
  const appContext = useContext(AppContext);
  const profilesInTeam = appContext.getProfilesInTeam(team.id);

  return (
    <TeamColumn>
      <Flex height="128px" alignItems="center" position="relative">
        <HeadingBackground src={teamImages[team.background]} />
        <TeamLogo
          src={teamImages[team.images.md]}
          alt={team.name}
          width="96px"
          height="96px"
        />
        <Flex flexDirection="column" ml="12px">
          <Heading title={team.name} level={2} color={team.textColor} />
          <Text mb="20px" color={team.textColor}>
            {team.users} users
          </Text>
        </Flex>
      </Flex>
      <Flex borderBottom={`1px solid ${team.textColor}`} pb="8px">
        <Text color={team.textColor}>{team.description}</Text>
      </Flex>
      <Flex flexDirection="column" pt="8px">
        <HeadingBackground src={teamImages[team.background]} />
        {profilesInTeam.length === 0 && (
          <Text color={team.textColor}>Profiles will appear here</Text>
        )}
        {profilesInTeam.map((profile) => (
          <ProfileCard key={profile.address} profile={profile} team={team} />
        ))}
      </Flex>
    </TeamColumn>
  );
};

export default TeamContainer;
