import _ from "lodash";
import { isNonEmptyString, validate } from "./validation";

// Validate else throw 422
export const isValidCreateModule = ({ semesterId, code, description, credits }) => {
  return validate([
    _.isNumber(credits),
    isNonEmptyString([code, semesterId]),
  ]);
};
