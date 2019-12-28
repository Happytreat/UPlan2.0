import styled from "styled-components";
import { Field, Form } from "formik";
import { Typography } from "@material-ui/core";

export const StyledForm = styled(Form)`
   margin: 0 auto;
   max-width: 320px;
   padding: 4rem 0;
   color: ${props => props.theme.secondary};
   font-family: ${props => props.theme.fontFamily};;
`;

export const StyledFormHeader = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const StyledError = styled(Typography)`
`;

export const ThemedField = styled(Field)`
  color: ${props => props.theme.secondary};
  border: 2px solid ${props => props.theme.secondary};
  padding-bottom: 1rem;
`;

export const StyledHelpBlock = styled.p`
  font-size: 14px;
  padding: 0.5rem 1rem;
  color: #999;
`;
