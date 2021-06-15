import React from "react";
import styled from "styled-components";

const StyledHeading = styled.div<{ level: number; color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ level }) => 3 / level}em;
  font-weight: 500;
  text-align: center;
`;

const Heading: React.FC<{ title: string; level?: number; color?: string }> = ({
  title,
  level = 1,
  color = "#FFFFFF",
}) => {
  return (
    <StyledHeading
      as={`h${level}` as React.ElementType}
      level={level}
      color={color}
    >
      {title}
    </StyledHeading>
  );
};

export default Heading;
