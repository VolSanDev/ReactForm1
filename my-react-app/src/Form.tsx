
import './Form.css';
import { FormEvent, useState } from "react";
import { FormValidators } from "./models/formValidators.ts";
import { FormControlState } from "./models/formControlState.ts";
import { InputType } from "./models/inputType.ts";

const minAge = 8;
const maxAge = 100;
const ageInputStep = 1;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Form() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(minAge);
    const [photo, setPhoto] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');

    const [formDisabled, setFormDisabled] = useState(true);

    const [formValidators, setFormValidators]: FormValidators = useState({
        firstName: {
            required: {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required'
            }
        },
        lastName: {
            required:  {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required'
            },
        },
        email: {
            required: {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required'
            },
            regex: {
                name: 'regex',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'Please use correct formatting. Example: address@gmail.com'
            },
        },
        age: {
            required: {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required'
            },
        },
        photo: {
            required: {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required',
            },
        },
        workoutDate: {
            required: {
                name: 'required',
                valid: false,
                state: FormControlState.Clean,
                errorMessage: 'This field is required',
            },
        }
    } as FormValidators);

   function onFirstName(value: string): void {
       performValidationLogic(InputType.FirstName, value);
   }

    function onLastName(value: string): void {
        performValidationLogic(InputType.FirstName, value);
    }

    function onEmail(value: string): void {
        // performValidation
        setEmail(value);
    }

    function onPhoto(value: string): void {
       performValidationLogic(InputType.Photo, value);
    }

    function onAge(value: string): void {
       performValidationLogic(InputType.Age, value);
    }

    function performValidationLogic(type: InputType, value: string): void {
     switch (type) {
         case InputType.FirstName:
             let newObject = {...formValidators};
             if (value && value.length > 0) {
                 setFirstName(value);

                 newObject.firstName.required.valid = true;
                 newObject.firstName.required.state = FormControlState.Touched;
             } else {
                 newObject.firstName.required.valid = false;
                 newObject.firstName.required.state = FormControlState.Touched;
             }
             setFormValidators(newObject);
             break;
         case InputType.LastName:
             if (value && value.length > 0) {
                 setLastName(value);

                 formValidators.lastName.required.valid = true;
                 formValidators.lastName.required.state = FormControlState.Touched;
             } else {
                 formValidators.lastName.required.valid = false;
                 formValidators.lastName.required.state = FormControlState.Touched;
             }
             break;
         case InputType.Email:
             if (value && value.length > 0) {
                 setEmail(value);

                 formValidators.email.required.valid = true;
                 formValidators.email.required.state = FormControlState.Touched;

                 if (emailRegex.test(value)) {
                     formValidators.email.regex.valid = true;
                     formValidators.email.regex.state = FormControlState.Touched;
                 } else {
                        formValidators.email.regex.valid = false;
                        formValidators.email.regex.state = FormControlState.Touched;
                 }

             } else {
                 formValidators.email.required.valid = false;
                 formValidators.email.required.state = FormControlState.Touched;
             }
             break;
         case InputType.Age:
             // perform validation
             break;
         case InputType.Photo:
             // perform validation
             break;
         case InputType.WorkoutDate:
             break;
             // perform validation
     }

     verifyFormDisabled();
    }

    function formOnSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
   }

   function verifyFormDisabled(): void {
       if (
              formValidators.firstName.required.valid
              && formValidators.lastName.required.valid
              && formValidators.email.required.valid
              && formValidators.email.regex.valid
              && formValidators.age.required.valid
              && formValidators.photo.required.valid
              && formValidators.workoutDate.required.valid
         ) {
              setFormDisabled(false);
         } else {
           setFormDisabled(true);
       }
   }

    return (
        <>
            <form onSubmit={e => formOnSubmit(e)}>
                <div className="main">
                    <div className={"headerDiv mb-3 customColor"}>
                <h1 className={"customColor"}>Personal info</h1>
                    </div>
                <div className="form-group">
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className="formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName" type="text"
                                onChange={(e) => onFirstName(e.target.value)}
                            />
                            {(!formValidators.firstName.required.valid
                                    && formValidators.firstName.required.state === FormControlState.Touched)
                                && <p className={'errorMessage'}> { formValidators.firstName.required.errorMessage } </p>}
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName" type="text"
                                onChange={(e) => onLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="text"
                                onChange={(e) => onEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="age">
                                Age
                            </label>
                            <div className={'rangeTopLabels mt-2'}><div className={'rangeTopLabel'}>8</div> <div className={'rangeTopLabel'}>100</div></div>
                            <input
                                className="formControl"
                                id="age" type="range"
                                min={minAge}
                                max={maxAge}
                                step={ageInputStep}
                                onChange={(e) => onAge(e.target.value)}
                                value={age}
                            />

                        </div>
                </div>
                    <button type="submit" className={"submitButton"}
                            disabled={true}
                    >Send Application
                    </button>
                </div>
            </form>
        </>
    )
}

export default Form;