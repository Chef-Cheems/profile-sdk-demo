import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { isAddress } from "ethers/lib/utils";
import { AppContext } from "../AppContext";
import { Flex } from "./Layout";

const animatedBorder = keyframes`
	0% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const StyledInput = styled.input<{ isValidAddress: boolean }>`
  position: relative;
  width: 400px;
  height: 46px;
  background-color: #ebebeb;
  border: ${({ isValidAddress }) =>
    isValidAddress ? "1px solid #00bbaa" : "1px solid #777"};
  outline: none;
  border-radius: 4px;
  padding: 12px 12px;

  &::-webkit-search-cancel-button {
    cursor: pointer;
    padding: 2px;
  }

  @media screen and (max-width: 831px) {
    width: 100%;
  }
`;

const AnimatedBorder = styled.div<{ $loading: boolean }>`
  position: relative;
  &:after {
    content: ${({ $loading }) => ($loading ? `''` : "none")};
    position: absolute;
    top: calc(-1 * 2px);
    left: calc(-1 * 2px);
    height: calc(100% + 2px * 2);
    width: calc(100% + 2px * 2);
    background: linear-gradient(
      90deg,
      #ff00e6,
      #00a6ff,
      #ff00e6,
      #00a6ff,
      #ff00e6,
      #00a6ff
    );
    border-radius: 6px;
    z-index: -1;
    animation: ${animatedBorder} 0.5s linear normal infinite;
    background-size: 300% 300%;
  }
`;

const StyledButton = styled.button`
  height: 46px;
  width: 180px;
  border-radius: 3px;
  border: 1px solid #777;
  background-color: #ebebeb;
`;

const AnimatedButtonContainer = styled.div`
  height: 46px;
  width: 180px;

  @media screen and (max-width: 831px) {
    margin-top: 12px;
  }
`;

const SearchInput = () => {
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [samplesLoading, setSamplesLoading] = useState({
    loading: false,
    done: false,
  });
  const appContext = useContext(AppContext);
  const loading = appContext.isLoadingData(address);

  useEffect(() => {
    if (isAddress(address)) {
      setIsValidAddress(true);
      appContext.fetchProfile(address);
    } else {
      setIsValidAddress(false);
    }
  }, [address, appContext]);

  const loadSampleData = async () => {
    setSamplesLoading({ loading: true, done: false });
    const loaded = await appContext.loadSampleAddresses();
    setSamplesLoading({ loading: false, done: loaded });
  };
  return (
    <Flex
      justifyContent="space-between"
      flexDirection={["column", "column", "row"]}
      mb="12px"
    >
      <AnimatedBorder $loading={loading}>
        <StyledInput
          type="search"
          autoComplete="off"
          disabled={loading}
          placeholder="Enter address"
          isValidAddress={isValidAddress}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </AnimatedBorder>
      <AnimatedButtonContainer>
        <AnimatedBorder $loading={samplesLoading.loading}>
          <StyledButton
            onClick={loadSampleData}
            disabled={samplesLoading.loading || samplesLoading.done}
          >
            {samplesLoading.done && "📥 Sample data loaded!"}
            {!samplesLoading.done && samplesLoading.loading && "📥 Loading..."}
            {!samplesLoading.done &&
              !samplesLoading.loading &&
              "📥 Load sample addresses"}
          </StyledButton>
        </AnimatedBorder>
      </AnimatedButtonContainer>
    </Flex>
  );
};

export default SearchInput;
