import React, { useState } from "react";
import "./login.css";
import { Button, CircularProgress, Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { MuiTelInput } from "mui-tel-input";
import { Phone, Sms } from "@mui/icons-material";

import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "react-otp-input";

import { toast, Toaster } from "react-hot-toast";

function Login() {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
  );
  const [value, setValue] = React.useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const [user, setUser] = useState(null);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSubmit = () => {
    console.log("Clicked", value);
    onSignup();
  };
  const handleOtp = () => {
    console.log("Clicked", otp);
    onOTPVerify();
  };

  //
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, value, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);

        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log("Firebase Error", error.message);
        if (error.message.includes("TOO_SHORT")) {
          toast.error(
            "Phone number appears to be incomplete. Please provide the full phone number."
          );
        } else if (error.message.includes("too-many-requests")) {
          toast.error(
            "Too many failed sign-in attempts. Please wait a few minutes before trying again."
          );
        }
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.message.includes("invalid-verification-code")) {
          toast.error("Invalid Verification Code");
        }
        setLoading(false);
      });
  }

  return (
    <div className="mainContainer">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="loginForm">
        {!user ? (
          <>
            {!showOTP ? (
              <>
                <Phone className="font"></Phone>
                <h2>Your Phone Number</h2>
                <MuiTelInput
                  className="custominput"
                  value={value}
                  onChange={handleChange}
                  style={{ background: "white" }}
                  defaultCountry="PK"
                />
                <Button
                  className="button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} className="loader " />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </>
            ) : (
              <>
                <Sms className="font"></Sms>
                <h2>Verification Code</h2>
                <p>
                  Please Enter Verfication<br></br> Code sent to {value}
                </p>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{ padding: 5 }}
                />
                <Button
                  className="button"
                  onClick={handleOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} className="loader " />
                  ) : (
                    "Confirm"
                  )}
                </Button>
                <Link className="changeNo" onClick={() => setShowOTP(false)}>
                  change number
                </Link>
              </>
            )}
          </>
        ) : (
          <div>
            <h2>Login success</h2>
          </div>
        )}
        <div id="recaptcha-container" className="justify-center flex"></div>
      </div>
    </div>
  );
}

export default Login;
