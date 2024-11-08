import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/Firebase.initial";

initializeAuthentication();
const UseFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setLoading] = useState("false");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  //google signIn
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);

        console.log(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //email password sign in
  const emailPassSignIn = (email, pass, navigate, name) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        // Update the user's display name
        updateProfile(result.user, { displayName: name })
          .then(() => {
            // Successfully set the display name
            setUser(result.user); // Update the user state with the updated user info
            navigate("/"); // Navigate to the desired route
          })
          .catch((error) => {
            console.error("Error setting display name:", error);
            alert("Account created, but failed to set display name.");
          });
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      });
  };

  // email password login
  const emailPassLogIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        alert(error.message);
      });
  };

  //update displayName
  const setUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  //send email as verification
  // const emailVerification = () => {
  //   sendEmailVerification(auth.currentUser).then((result) => {
  //     console.log(result);
  //     // Email verification sent!
  //     // ...
  //   });
  // };

  //logout
  const Logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return {
    googleSignIn,
    user,
    Logout,
    emailPassSignIn,
    emailPassLogIn,
  };
};
export default UseFirebase;
