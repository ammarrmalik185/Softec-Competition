import Image from 'next/image';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useState } from "react";
import { collection, doc, getDoc, setDoc , getFirestore } from "firebase/firestore";
import {useRouter} from "next/router";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [OTPInput, setOTPInput] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("Male");
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [speciality, setSpeciality] = useState("")

    const auth = getAuth();
    const db = getFirestore();

    const router = useRouter();

    function showSnackbarAlert(message){
        let snackBar = document.getElementById("snackbar");
        snackBar.innerText = message;
        snackBar.className = "show";

        setTimeout(function(){
                snackBar.className = snackBar.className.replace("show", "");
            }, 3000
        );
    }

    function isValidPhoneNumber(value) {
        if (value === "") {
            return true;
        }
        return /^\+?[0-9]{0,12}$/.test(value);
    }

    const generateRecaptcha = function () {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',
                { size: "invisible" }, auth
            );
        }
    }

    const requestOTP = function () {

        const users = collection(db, "createdAccounts");
        getDoc(doc(users, phoneNumber))
            .then(function (doc) {
                console.log(doc)
                if (doc.exists()) {
                    showSnackbarAlert("User already exists");
                } else {
                    generateRecaptcha();
                    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
                        .then(function (confirmationResult) {
                            showSnackbarAlert("OTP Sent");
                            setOtpSent(true);
                            window.confirmationResult = confirmationResult;
                            console.log(confirmationResult);
                        })
                        .catch(function (error) {
                            showSnackbarAlert("OTP Sending Failed, Try again");
                            console.log(error)
                        });
                }
            });
    }

    const verifyOTP = function () {
        window.confirmationResult.confirm(OTPInput)
            .then(function (result) {
                console.log(result);
                showSnackbarAlert("OTP Verified");

                const user = {
                    name,
                    speciality,
                    dateOfBirth,
                    gender
                }
                Promise.all([
                    setDoc(doc(collection(db, "createdAccounts"), phoneNumber), {
                      type: "Doctor"
                    }),
                    setDoc(doc(collection(db, "doctors"), phoneNumber), user)
                ]).then(function (doc) {
                    showSnackbarAlert("User Created");
                    router.push("/doctor");
                    console.log(doc)
                }).catch(function (error) {
                    showSnackbarAlert("User Creation Failed");
                    console.log(error)
                });
            }).catch(function (error) {
                showSnackbarAlert("OTP Verification Failed, Try again");
                console.log(error)
            });
    }

    return (
        <div>
            <div className="flex h-screen" style={{
                backgroundImage: "url(" + "/assets/loginPageBackground.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="loginFormBackground">
                    <div className="loginFormModelContainer">
                        <div className="flex justify-center">
                            <Image src="/assets/logo.png" width={150} height={150} alt="Logo"/>
                        </div>
                        <div className="loginFormSingleFieldContainer">
                            <p style={{marginBottom: -12}}>Welcome to </p>
                            <h1 style={{fontSize: 50, marginTop: 0, fontFamily: "sans-serif"}}><span style={{color: "blue"}}>V</span> Cure</h1>
                        </div>
                        <div className="loginFormSingleFieldContainer">
                            <h1 style={{fontSize: 30, marginTop: 0, fontFamily: "sans-serif"}}>Sign up as a <span style={{color: "blue"}}>Doctor</span></h1>
                        </div>
                        <div className="loginFormSingleFieldContainer">
                            <label className='loginFormLabel'>Name</label>
                            <input
                                placeholder={"Enter your name"}
                                value={name}
                                onChange={event => setName(event.target.value)}
                                className='loginFormField'/>
                        </div>
                        <div className="loginFormSingleFieldContainer">
                            <label className='loginFormLabel'>Phone Number</label>
                            <input
                                placeholder={'+920000000000'}
                                value={phoneNumber}
                                onChange={event => {
                                    if (isValidPhoneNumber(event.target.value)) {
                                        setPhoneNumber(event.target.value);
                                    }
                                }}
                                className='loginFormField'/>
                        </div>

                        <div className="loginFormSingleFieldContainer">
                            <label className='loginFormLabel'>Gender</label>
                            <select
                                value={gender}
                                onChange={event => setGender(event.target.value)}
                                className='loginFormField'>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unknown">Prefer not to answer</option>
                            </select>
                        </div>

                        <div className="loginFormSingleFieldContainer">
                            <label className='loginFormLabel'>Date of Birth</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={event => setDateOfBirth(event.target.value)}
                                className='loginFormField'/>
                        </div>

                        <div className="loginFormSingleFieldContainer">
                            <label className='loginFormLabel'>Speciality</label>
                            <input
                                value={speciality}
                                onChange={event => setSpeciality(event.target.value)}
                                className='loginFormField'/>
                        </div>


                        <div id={"recaptcha-container"}/>

                        <div className="flex justify-center">
                            <button
                                className="loginFormButton"
                                onClick={requestOTP}
                            >Request OTP</button>

                        </div>

                        {otpSent &&
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter OTP</label>
                                <input className='loginFormField'
                                       onChange={(event => setOTPInput(event.target.value))}/>
                            </div>
                        }

                        {otpSent &&
                            <div className="loginFormSingleFieldContainer">
                                <button
                                    className="loginFormButton"
                                    onClick={() => verifyOTP()}
                                >Enter OTP</button>
                            </div>
                        }
                        <div>
                            <p className='underline text-center cursor-pointer' onClick={() => {
                                router.push("/login");
                            }}>Already have an account? Login here</p>
                        </div>

                    </div>
                </div>
            </div>
            <div id="snackbar"/>
        </div>

    )
}
