// import { useState, useEffect } from "react";

// export const enrollNewUser = () => {

//     const [faceio, setFaceio] = useState(null);
//     const [error, setError] = useState(null);

//     if (!window.faceIO) {
//         console.log(window);
//         alert("faceIO is not available.");
//         return;
//     }
//     const faceio = new window.faceIO("fioa3c01");
//     // Start the facial enrollment process
//     faceio.enroll({
//          "locale": "auto", // Default user locale
//          "payload": {
//          /* The payload we want to associate with this user
//          * which is forwarded back to us upon future
//          * authentication of this particular user.*/
//          "whoami": 123456, // Example of dummy ID linked to this particular user
//          "email": "john.doe@example.com"
//          }
//      }).then(userInfo => {
//          // User Successfully Enrolled!
//          alert(
//              `User Successfully Enrolled! Details:
//              Unique Facial ID: ${userInfo.facialId}
//              Enrollment Date: ${userInfo.timestamp}
//              Gender: ${userInfo.details.gender}
//              Age Approximation: ${userInfo.details.age}`
//          );
//          console.log(userInfo);
//          // handle success, save the facial ID, redirect to dashboard...
//      }).catch(errCode => {
//          // handle enrollment failure. Visit:
//          // https://faceio.net/integration-guide#error-codes
//          // for the list of all possible error codes
//      })
// }

// export const authenticateUser = () => {
//     if (!window.faceIO) {
//         alert("faceIO is not available.");
//         return;
//     }
//     const faceio = new window.faceIO("fioa3c01");
//     // Authenticate a previously enrolled user
//      faceio.authenticate({
//          "locale": "auto" // Default user locale
//      }).then(userData => {
//          console.log("Success, user identified")
//          // Grab the facial ID linked to this particular user which will be same
//          // for each of his successful future authentication. FACEIO recommend 
//          // that your rely on this Facial ID if you plan to uniquely identify 
//          // all enrolled users on your backend for example.
//          console.log("Linked facial Id: " + userData.facialId)
//          // Grab the arbitrary data you have already linked (if any) to this particular user
//          // during his enrollment via the payload parameter of the enroll() method.
//          console.log("Payload: " + JSON.stringify(userData.payload)) 
//          // {"whoami": 123456, "email": "john.doe@example.com"} set via enroll()
//      }).catch(errCode => {
//          // handle authentication failure. Visit:
//          // https://faceio.net/integration-guide#error-codes
//          // for the list of all possible error codes
//      })
//  }