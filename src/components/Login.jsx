import React from "react";
import { useState, useEffect, useRef } from "react";
// import { enrollNewUser, authenticateUser } from "../faceIO";

function Login() {

  // const [faceio, setFaceio] = useState(null);
  // const [error, setError] = useState(null);
  // const faceioRef = useRef();
  
  // useEffect(() => {
  //   setFaceio(faceioRef.current); // Accede a faceIO desde el ref
  //   console.log("UseEffect: " + faceioRef.current);
  // }, []);

  // Use useEffect hook to initialize FaceIO instance when component mounts
  // useEffect(() => {
  //   const initializeFaceIO = async () => {
  //     try {
  //       // Create a new instance of FaceIO with your public ID
  //       const faceioInstance = new faceIO("fioa3c01");
  //       // Update state with the instance
  //       setFaceio(faceioInstance);
  //     } catch (error) {
  //       // Set error state if initialization fails
  //       setError("Failed to initialize FaceIO: " + error.message);
  //     }
  //   };
  //   initializeFaceIO();
  // }, []);

  // const handleEnroll = async () => {
  //   try {
  //     // Call the enroll method of the FaceIO instance with necessary options
  //     const response = await faceio.enroll({
  //       locale: "auto",
  //       payload: {
  //         email: "example@gmail.com",
  //         pin: "12345",
  //       },
  //     });
  //     // Log enrollment details to the console
  //     console.log(`Unique Facial ID: ${response.facialId} Enrollment Date: ${response.timestamp} Gender: ${response.details.gender} Age Approximation: ${response.details.age}`);
  //   } catch (error) {
  //     // Set error state if enrollment fails
  //     setError("Enrollment failed: " + error.message);
  //   }
  // };



  // Define function to handle authentication
  // const handleAuthenticate = async () => {
  //   try {
  //     // Call the authenticate method of the FaceIO instance with necessary options
  //     const response = await faceio.authenticate({
  //       locale: "auto",
  //     });
  //     // Log authentication details to the console
  //     console.log(`Unique Facial ID: ${response.facialId} PayLoad: ${response.payload}`);
  //   } catch (error) {
  //     // Set error state if authentication fails
  //     setError("Authentication failed: " + error.message);
  //   }
  // };

  return (
    <div>
      {/* <button>Login</button> */}
      {/* <button onClick={handleEnroll}>Enroll</button>
      <button onClick={handleAuthenticate}>Authenticate</button> */}
      {/* {error && <div className="error">{error}</div>} */}
    </div>
  );
}

export default Login;