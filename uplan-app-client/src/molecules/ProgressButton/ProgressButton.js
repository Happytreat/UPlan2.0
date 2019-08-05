import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default ({
                  isLoading,
                  text,
                  loadingText,
                  className = "",
                  disabled = false,
                  ...props
                }) =>
  <Button
    className={`ProgressButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Spinner animation="border" size="sm"/>}
    {!isLoading ? text : loadingText}
  </Button>;