import { HTMLAttributes } from "react";
import styled from "styled-components";
import {
  background,
  border,
  layout,
  position,
  space,
  flexbox,
  typography,
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";

interface BoxProps
  extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {}

interface FlexProps extends BoxProps, FlexboxProps {}

export const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  small?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

export const Text = styled.div<TextProps>`
  color: ${({ color }) => color};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: "#000000",
  small: false,
};

export default Text;
