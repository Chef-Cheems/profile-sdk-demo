import React from "react";
import styled, { keyframes } from "styled-components";
import {
  Team,
  Achievement,
  teamImages,
  achievementBadges,
  TranslatableText,
} from "@pancakeswap/profile-sdk";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Flex, Text } from "./Layout";
import BSCLink from "./BSCLink";
import { ProfileData } from "../AppContext";

const animatedBorder = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const StyledCard = styled(Flex)`
  position: relative;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.5);
  padding: 8px;
  margin: 8px 0;
  & * {
    z-index: 1;
  }
`;

const AnimatedStyledCard = styled(StyledCard)`
  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * 3px);
    left: calc(-1 * 3px);
    height: calc(100% + 3px * 2);
    width: calc(100% + 3px * 2);
    background: linear-gradient(120deg, #ff00e6, #00fff7, #ff00e6, #00fff7);
    border-radius: 6px;
    z-index: -1;
    animation: ${animatedBorder} 3s ease alternate infinite;
    background-size: 300% 300%;
  }
`;

const CardBackground = styled.img<{
  filter?: string;
}>`
  left: 0;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  object-fit: cover;
  filter: ${({ filter }) => filter ?? "none"};
  border-radius: 6px;
`;

const BunnyImage = styled.img`
  width: 64px;
  border-radius: 50%;
`;

const Tooptip = styled.div`
  background-color: #ebebeb;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 4px;
  max-width: 250px;
`;

const TooltipArrow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #ebebeb;
  visibility: hidden;
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ebebeb;
  }

  &::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }
`;
/**
 *  You can utilize TranslatableText fully if you want to support multiple languages
 *  See PancakeSwap main repo for examples of working with translations
 */
const getTranslation = (translatableText: TranslatableText) => {
  if (typeof translatableText === "object") {
    return translatableText.fallback;
  }
  return translatableText;
};

const getTooltipContent = (achievement: Achievement) => {
  let tooltipText = getTranslation(achievement.title);
  if (achievement.description) {
    tooltipText = getTranslation(achievement.description);
  }
  return (
    <div>
      <Text>{tooltipText}</Text>
      <Text>{achievement.points} points</Text>
    </div>
  );
};

const bgFilters = ["brightness(0.9)", "brightness(0.6)", "brightness(0.9)"];

const ProfileCard: React.FC<{ profile: ProfileData; team: Team }> = ({
  profile,
  team,
}) => {
  const profileData = profile.profile;
  const achievements = profile.achievements;
  const cardContent = (
    <>
      <CardBackground
        src={teamImages[team.background] as string}
        filter={bgFilters[team.id - 1]}
      />
      <Flex justifyContent="space-between" alignItems="center" mb="4px">
        <Flex alignItems="center">
          {profileData!.nft ? (
            <BunnyImage
              src={profileData!.nft.images.ipfs}
              alt={profileData!.nft.name}
            />
          ) : null}
          <Text fontSize="20px" color={team.textColor} ml="8px">
            {profileData!.username}
          </Text>
        </Flex>
        <Text fontSize="16px" color={team.textColor}>
          User ID: {profileData!.userId}
        </Text>
      </Flex>
      <BSCLink
        color={team.textColor}
        href={`https://bscscan.com/address/${profile.address}`}
      >
        {profile.address}
      </BSCLink>
      <Flex justifyContent="space-between">
        <Text color={team.textColor}>Points: {profileData!.points}</Text>
        {profile.isSample && <Text color="#ddd">Sample</Text>}
      </Flex>
      <Flex>
        <Flex flex="1">
          <Text color={team.textColor}>
            Achievements: {achievements!.length}
          </Text>
        </Flex>
        <Flex flexWrap="wrap" flex="1.35">
          {achievements
            ? achievements.map((achievement) => (
                <Tippy
                  key={achievement.id}
                  animation={false}
                  render={(attrs) => (
                    <Tooptip {...attrs}>
                      {getTooltipContent(achievement)}
                      <TooltipArrow data-popper-arrow="" />
                    </Tooptip>
                  )}
                >
                  <img
                    src={achievementBadges[achievement.badge]}
                    alt={getTranslation(achievement.title)}
                    height="32px"
                  />
                </Tippy>
              ))
            : null}
        </Flex>
      </Flex>
    </>
  );
  if (profile.isSample) {
    return <StyledCard>{cardContent}</StyledCard>;
  }
  return <AnimatedStyledCard>{cardContent}</AnimatedStyledCard>;
};

export default ProfileCard;
