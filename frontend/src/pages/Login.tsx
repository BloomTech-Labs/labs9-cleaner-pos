import axios from 'axios';
import firebase, { Unsubscribe, User } from 'firebase/app';
import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../firebase.setup';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const justMounted = useRef(true);

  const uiConfig = {
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
    signInFlow: 'popup',
    // Render Buttons for following Providers:
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    /*
    Sets up observer for the firebase authState and uses our setUser function
    to set the User object once data has been obtained
    */
    let observer: Unsubscribe;
    if (!justMounted.current) {
      observer = app.auth().onAuthStateChanged((newUser) => setUser(newUser));
    }
    justMounted.current = false;
    // Removes the observer set up above
    // @ts-ignore
    return () => {
      if (observer) {
        observer();
      }
    };
    //   };
  }, []);

  useEffect(
    () => {
      submitUser();
      // @ts-ignore
    },
    [user],
  );

  async function submitUser() {
    if (user) {
      const { email, uid, displayName, photoURL } = user;
      const nUser = {
        email,
        ext_it: uid,
        full_name: displayName,
        photoURL,
        role: 'manager',
      };
      try {
        const { data } = await axios.post(
          'https://cleaner-pos.herokuapp.com/users/',
          nUser,
        );
        if (data.first) {
          props.history.push('/postreg');
        }
        localStorage.setItem('token', data.token);
      } catch (e) {
        throw e;
      }
    }
  }
  return (
    <div>
      <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </div>
  );
};

export default Login;
