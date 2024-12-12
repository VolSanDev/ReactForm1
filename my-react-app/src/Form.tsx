import './Form.css';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import axios, { AxiosResponse } from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Slider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import { FormValidators } from "./models/formValidators.ts";
import { FormControlState } from "./models/formControlState.ts";
import { InputType } from "./models/inputType.ts";
import { Holiday } from "./models/holiday.ts";
import { HolidayType } from "./models/holidayType.ts";
import { InfoAboutEvent } from "./models/infoAboutEvent.ts";

import { format } from "date-fns";


const minAge = 8;
const maxAge = 100;
const ageInputStep = 1;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const workoutTimes = ['12:00', '14:00', '16:30', '18:30', '20:00'];

function Form() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(-1);
    const [photo, setPhoto] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');
    const [workoutTime, setWorkoutTime] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    const [formDisabled, setFormDisabled] = useState(true);

    const [infoAboutEvent, setInfoAboutEvent] = useState({
        shouldDisplay: false,
        message: '',
    } as InfoAboutEvent);

    const [showWorkoutTimes, setShowWorkoutTimes] = useState(false);

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
                errorMessage: 'Workout date is required',
            },
        },
        workoutTime: {
           required: {
               name: 'required',
               valid: false,
               state: FormControlState.Clean,
               errorMessage: 'Workout time is required'
           }
        }
    } as FormValidators);

    let holidays: Holiday[] = [];

    useEffect(() => {

        listenToResize();

        axios.get('https://api.api-ninjas.com/v1/holidays?country=PL&year=2024', {
            headers: {
                'X-Api-Key': '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx',
            }
        })
            .catch(error => {
                console.log("error while retrieving holidays: ", error);
            })
            .then((response: void | AxiosResponse<Holiday[]>) => {
                if (response && response.data) {
                    holidays = response.data;
                }
            });
    });

   function onFirstName(value: string): void {
       performValidationLogic(InputType.FirstName, value);
   }

    function onLastName(value: string): void {
        performValidationLogic(InputType.LastName, value);
    }

    function onEmail(value: string): void {
        performValidationLogic(InputType.Email, value);
    }

    function onPhoto(value: ChangeEvent<HTMLInputElement> | null): void {
       if (value && value.target && value.target.files && value.target.files[0].name) {
           performValidationLogic(InputType.Photo, value.target.files[0].name);
       } else {
           performValidationLogic(InputType.Photo, '');
       }
      // performValidationLogic(InputType.Photo, value);
    }

    function onWorkoutDate(value: string): void {
       performValidationLogic(InputType.WorkoutDate, value);
   }

    function onAge(value: string): void {
       performValidationLogic(InputType.Age, value);
    }

    function onWorkoutTime(value: string): void {
       performValidationLogic(InputType.WorkoutTime, value);
    }

    function listenToResize(): void {
       window.addEventListener('resize', () => {
           setIsMobile(window.innerWidth <= 1000);
       });
    }

    function performValidationLogic(type: InputType, value: string): void {
        switch (type) {
            case InputType.FirstName: {
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
            }

            case InputType.LastName: {
                let newObject = {...formValidators};
                if (value && value.length > 0) {
                    setLastName(value);

                    newObject.lastName.required.valid = true;
                    newObject.lastName.required.state = FormControlState.Touched;
                } else {
                    newObject.lastName.required.valid = false;
                    newObject.lastName.required.state = FormControlState.Touched;
                }
                setFormValidators(newObject);
                break;
            }
            case InputType.Email: {
                let newObject = {...formValidators};
                if (value && value.length > 0) {
                    setEmail(value);

                    newObject.email.required.valid = true;
                    newObject.email.required.state = FormControlState.Touched;

                    if (emailRegex.test(value)) {
                        newObject.email.regex.valid = true;
                        newObject.email.regex.state = FormControlState.Touched;
                    } else {
                        newObject.email.regex.valid = false;
                        newObject.email.regex.state = FormControlState.Touched;
                    }

                } else {
                    newObject.email.required.valid = false;
                    newObject.email.required.state = FormControlState.Touched;
                    newObject.email.regex.state = FormControlState.Clean;
                }
                setFormValidators(newObject);
                break;
            }
            case InputType.Age:
            {
                let newObject = {...formValidators};
                newObject.age.required.valid = true;
                newObject.age.required.state = FormControlState.Touched;
                setAge(parseInt(value));
                break;
            }
            case InputType.Photo:
            {
                let newObject = {...formValidators};

                if (value && value.length > 0) {
                    setPhoto(value);

                    newObject.photo.required.valid = true;
                    newObject.photo.required.state = FormControlState.Touched;
                } else {
                    setPhoto('');

                    newObject.photo.required.valid = false;
                    newObject.photo.required.state = FormControlState.Touched;
                }

                setFormValidators(newObject);
                break;
            }
            case InputType.WorkoutDate: {
                let newObject = {...formValidators};
                value = format(new Date(value), 'yyyy-MM-dd');
                if (value && value.length > 0) {
                    setWorkoutDate(value);

                    newObject.workoutDate.required.valid = true;
                    newObject.workoutDate.required.state = FormControlState.Touched;
                } else {
                    newObject.workoutDate.required.valid = false;
                    newObject.workoutDate.required.state = FormControlState.Touched;
                }

                if (!(formValidators.age.required.state === FormControlState.Touched)) {
                    formValidators.age.required.state = FormControlState.Touched;
                }

                verifyWorkoutDate(value);
                break;
            }
            case InputType.WorkoutTime: {
                let newObject = {...formValidators};
                newObject.workoutTime.required.valid = true;
                setWorkoutTime(value);
                break;
            }

     }

     verifyFormDisabled();
    }

    function verifyWorkoutDate(input: string): void {
       const found = holidays.find(holiday => holiday.date === input && holiday.type === HolidayType.Observance);
         if (found) {
              setInfoAboutEvent({
                shouldDisplay: true,
                message: found.name
              });
              setShowWorkoutTimes(false);
         } else {
              setInfoAboutEvent({
                shouldDisplay: false,
                message: ''
              });
             setShowWorkoutTimes(true);
         }
    }

    function submitForm(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('age', age.toString());
        formData.append('photo', photo);
        formData.append('workoutDate', workoutDate);
        formData.append('workoutTime', ""); // todo configure time

        axios.post('http://letsworkout.pl/submit', formData)
            .then(response => {
                // handle response
            })
            .catch(error => {
              // handle error
            });
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
              && formValidators.workoutTime.required.valid
         ) {
              setFormDisabled(false);
         } else {
           setFormDisabled(true);
       }
   }

   function firstNameControlInvalid(): boolean {
       return (!formValidators.firstName.required.valid
           && formValidators.firstName.required.state === FormControlState.Touched);
   }

    function lastNameControlInvalid(): boolean {
        return (!formValidators.lastName.required.valid
            && formValidators.lastName.required.state === FormControlState.Touched);
    }

    function emailControlRequiredInvalid(): boolean {
       return (!formValidators.email.required.valid
              && formValidators.email.required.state === FormControlState.Touched);
    }

    function emailControlRegexInvalid(): boolean {
        return !formValidators.email.regex.valid
            && formValidators.email.regex.state === FormControlState.Touched;
    }

    function ageControlInvalid(): boolean {
       return !formValidators.age.required.valid
             && formValidators.age.required.state === FormControlState.Touched;
    }

    function photoControlInvalid(): boolean {
        return !formValidators.photo.required.valid
            && formValidators.photo.required.state === FormControlState.Touched;
    }

    function workoutDateInvalid(): boolean {
        return !formValidators.workoutDate.required.valid
            && formValidators.workoutDate.required.state === FormControlState.Touched;
    }

    function workoutTimeInvalid(): boolean {
        return !formValidators.workoutTime.required.valid
            && formValidators.workoutTime.required.state === FormControlState.Touched;
    }

    return (
        <>
            <form onSubmit={e => submitForm(e)}>
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
                                className={`formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${firstNameControlInvalid() && 'errorControl'}`}
                                id="firstName" type="text"
                                onChange={(e) => onFirstName(e.target.value)}
                            />
                            {firstNameControlInvalid() &&
                                <p className={'errorMessage'}> {formValidators.firstName.required.errorMessage} </p>}
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className={`formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${lastNameControlInvalid() && 'errorControl'}`}
                                id="lastName" type="text"
                                onChange={(e) => onLastName(e.target.value)}
                            />
                            {lastNameControlInvalid() &&
                                <p className={'errorMessage'}> {formValidators.lastName.required.errorMessage} </p>}
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className={`formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${(emailControlRegexInvalid() || emailControlRequiredInvalid()) && 'errorControl'}`}
                                id="email" type="text"
                                onChange={(e) => onEmail(e.target.value)}
                            />
                            {emailControlRequiredInvalid() &&
                                <p className={'errorMessage'}> {formValidators.email.required.errorMessage} </p>}
                            {emailControlRegexInvalid() &&
                                <p className={'errorMessage'}> {formValidators.email.regex.errorMessage} </p>}
                        </div>
                        <div className="mb-5 rangeInput">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="age">
                                Age
                            </label>
                            <div className={'rangeTopLabels mt-2'}>
                                <div className={'rangeTopLabel'}>8</div>
                                <div className={'rangeTopLabel'}>100</div>
                            </div>
                       <Slider
                       size={'small'}
                       step={ageInputStep}
                       valueLabelDisplay={'auto'}
                       defaultValue={minAge}
                       max={maxAge}
                       min={minAge}
                       sx={{
                           width: '98.8%',
                           height: '3px',
                           color: '#8456e5',
                           '& .MuiSlider-thumb': {
                               width: '15px',
                               height: '15px',
                           },
                           '& .MuiSlider-valueLabel': {
                               background: '#fff',
                               color: '#6d3be3',
                           }
                       }}
                       onChange={(e, value) => onAge(value.toString())}
                       ></Slider>
                            { ageControlInvalid() && <p className={'errorMessage'}> {formValidators.age.required.errorMessage} </p>}
                        </div>
                        <div className="mb-5 controlDiv">
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="photo">
                                Photo
                            </label>
                            <div>
                                <div>
                                    <div className={'photoDiv formControl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
                                    >
                                        { !(photo && photo.length > 0) && <p className={'photoMessage'} onClick={() => document.getElementById('photo')?.click()}> <a className={'photoMessage1'}>Upload a file</a> { !isMobile && <span className={'photoMessage2'}>or drag and drop here</span> }</p> }
                                        { (photo && photo.length > 0) && <p className={'photoMessagePresent'}> {photo} <CloseIcon sx={{
                                            cursor: 'pointer',
                                            background: '#020950',
                                            color: '#fff',
                                            borderRadius: '50%',
                                            fontSize: '120%',
                                            '&:hover': {
                                                background: '#ff0000',
                                            }
                                        }}
                                        onClick={() => onPhoto(null)}
                                        ></CloseIcon> </p> }
                                    </div>
                                    {photoControlInvalid() &&
                                        <p className={'errorMessage'}> {formValidators.photo.required.errorMessage} </p>}
                                    <input
                                        className="formControl photoControl"
                                        type="file"
                                        id="photo"
                                        onChange={(e) => onPhoto(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"headerDiv2 headerDiv mb-3 customColor"}>
                        <h1 className={"customColor mt-5 "}>Your workout</h1>
                    </div>
                    <div className="mb-5">
                            <div className={`${!isMobile ? 'datesSubContainerWeb' : 'datesSubContainerMobile'}`}>
                            <div>
                            <label className="customColor formLabel block text-black-500 text-sm text-left"
                                   htmlFor="date">
                               Date
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                className={`dateCalendar  ${isMobile ? 'dateCalendarMobile' : 'dateCalendarWeb'}`}
                                onChange={(date) => onWorkoutDate(date.toString())}
                                ></DateCalendar>
                            </LocalizationProvider>
                            </div>
                                { showWorkoutTimes &&
                                <div className={`${!isMobile ? 'timesContainer' : 'timesContainerMobile mt-2'}`}>
                                    <div>
                                    <label className="customColor formLabel block text-black-500 text-sm text-left"
                                           htmlFor="date">
                                        Time
                                    </label>
                                        <div className={`mb-5 ${isMobile && 'timesSubContainerMobile'}`}
                                        >
                                    {
                                        workoutTimes.map((time, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={` ${!isMobile ? 'mb-5 timeDiv' : 'timeDivMobile'} ${workoutTime === time ? 'timeDivSelected' : ''}`}
                                                onClick={() => {onWorkoutTime(time)}}
                                                >
                                                    <p>{time}</p>
                                                </div>
                                            )
                                        })
                                    }
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            {infoAboutEvent.shouldDisplay && <p className={'dateEventInfoP mb-3'}><InfoIcon
                                sx={{
                                color: '#9674e3'
                            }}
                            ></InfoIcon>{ `It's  ${infoAboutEvent.message}`} </p>}
                        {workoutDateInvalid() &&
                            <p className={'errorMessage'}> {formValidators.workoutDate.required.errorMessage} </p>}
                        {workoutTimeInvalid() &&
                            <p className={'errorMessage'}> {formValidators.workoutTime.required.errorMessage} </p>}
                    </div>
                        <button type="submit" className={"submitButton"}
                                disabled={formDisabled}
                        >Send Application
                        </button>
                    </div>
            </form>
        </>
)
}

export default Form;