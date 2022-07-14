import Image from 'next/image';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useState } from "react";
import { collection, doc, getDoc , getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [OTPInput, setOTPInput] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const router = useRouter();

    const auth = getAuth();
    const db = getFirestore();

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
                } else {
                    showSnackbarAlert("User does not exists");
                }
            });
    }

    const verifyOTP = () => {
        window.confirmationResult.confirm(OTPInput)
            .then(function (result) {
                showSnackbarAlert("OTP Verified");
                getDoc(doc(collection(db, "createdAccounts"), phoneNumber))
                    .then(function (doc) {
                        console.log(doc)
                        if (doc.exists()) {
                            if (doc.data().type === "Doctor"){
                                router.push("/doctor");
                            } else {
                                router.push("/patient");
                            }
                        } else {
                            showSnackbarAlert("User type is not set");
                            console.log("User does not exist");
                        }
                    });
                console.log(result);
            }).catch(function (error) {
                showSnackbarAlert("OTP Verification Failed");
                console.log(error);
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
                            <label className='loginFormLabel'>Phone Number</label>
                            <input
                                value={phoneNumber}
                                onChange={event => {
                                    if (isValidPhoneNumber(event.target.value)) {
                                        setPhoneNumber(event.target.value);
                                    }
                                }}
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
                                    onClick={verifyOTP}
                                >Sign up</button>
                            </div>
                        }

                        <div>
                            <p className='text-center text-xl'>Dont have an Account?</p>
                        </div>
                        <div>
                            <p className='underline text-center cursor-pointer' onClick={() => {
                                router.push("/SignupDoctor");
                            }}>Signup as Doctor</p>
                        </div>
                        <div>
                            <p className='underline text-center cursor-pointer' onClick={() => {
                                router.push("/SignupPatient");
                            }}>Signup as Patient</p>
                        </div>

                    </div>
                </div>
            </div>
            <div id="snackbar"/>
        </div>

    )
}
