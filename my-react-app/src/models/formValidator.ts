import { FormValidatorSub } from "./FormValidatorSub.ts";

export interface FormValidator {
  required: FormValidatorSub;
  regex?: FormValidatorSub;
}