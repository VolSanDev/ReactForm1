import { FormControlState } from "./formControlState.ts";

export interface FormValidatorSub {
    name: string;
    valid: boolean;
    errorMessage: string;
    state: FormControlState;
}