import React from "react";
import styled from "styled-components";
import { Button, Spinner } from "react-bootstrap";

const StyledButton = styled(Button)`
  border-radius: 15px;
  border: 2px solid ${props => props.theme.secondary};
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.primary};
  &:hover{
    border: 2px solid ${props => props.theme.secondary};
    background-color: ${props => props.theme.secondary};
  }
`;

const StyledText = styled.div`
  && {
    color: ${props => props.theme.secondary};
    display: inline-block;
    margin: auto;
  }
`;

const StyledSpinner = styled(Spinner)`
  color: ${props => props.theme.secondary};
  display: inline-block;
  margin: auto;
`;

export default ({
                  isLoading,
                  text,
                  loadingText,
                  disabled = false,
                  ...props
                }) =>
  <StyledButton
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading
      ? (<>
          <StyledSpinner animation="border" size="sm"/>
          <StyledText>{loadingText}</StyledText>
          </>)
      : text}
  </StyledButton>;
