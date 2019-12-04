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

export default ({
                  isLoading,
                  text,
                  loadingText,
                  className = "",
                  disabled = false,
                  ...props
                }) =>
  <StyledButton
    className={`ProgressButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Spinner animation="border" size="sm"/>}
    {!isLoading ? text : loadingText}
  </StyledButton>;
