import styled from "styled-components";

const BSCLink = styled.a<{ color?: string }>`
  font-size: 12px;
  color: ${({ color }) => (color ? color : "#13a19c")};

  &:hover {
    opacity: 0.7;
  }
`;

export default BSCLink;
