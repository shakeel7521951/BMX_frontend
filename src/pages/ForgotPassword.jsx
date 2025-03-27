import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForgotpasswordotpMutation, useVerifyOTPMutation } from "../redux/userApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [forgotpasswordotp, { isLoading, error }] =
    useForgotpasswordotpMutation();
  const [verifyOTP, { isLoading: verifyOtpLoading }] = useVerifyOTPMutation();

  const handleSendOtp = async () => {
    try {
      const response = await forgotpasswordotp(email).unwrap();
      toast.success(response.message, { position: "top-center" });
      if (response.message === "OTP sent successfully!") {
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.data?.message || "Failed to send OTP.", {
        position: "top-center",
      });
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.", {
        position: "top-center",
      });
      return;
    }
  
    try {
      const response = await verifyOTP({ email, otp: enteredOtp }).unwrap();
      toast.success(response.message, { position: "top-center" });
      navigate("/reset-password", { state: { email } }); 
    } catch (err) {
      toast.error(err.data?.message || "Failed to verify OTP.", {
        position: "top-center",
      });
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong. Please try again later!</div>;
  }

  return (
    <div className="flex justify-center items-center py-24 bg-gray-100">
      <div className="p-8 shadow-2xl rounded-md bg-white w-[30rem]">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#b39c2a]">Forgot Password</h1>

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#b39c2a] p-2 rounded-lg w-full outline-none"
            />
            <button
              onClick={handleSendOtp}
              className="bg-[#b39c2a] cursor-pointer text-white p-2 rounded-lg w-full  focus:outline-none"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center">Enter the OTP sent to your email</p>
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  className="w-12 h-12 border-2 border-[#b39c2a] text-center rounded-lg outline-none"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={verifyOtpLoading}
              className="bg-[#b39c2a] cursor-pointer text-white p-2 rounded-lg w-full outline-none"
            >
              {verifyOtpLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
