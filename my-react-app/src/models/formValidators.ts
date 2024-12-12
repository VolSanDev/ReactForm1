import { FormValidator } from "./formValidator.ts";

export interface FormValidators {
    firstName: FormValidator;
    lastName: FormValidator;
    email: FormValidator;
    age: FormValidator;
    photo: FormValidator;
    workoutDate: FormValidator;
    workoutTime: FormValidator;
}