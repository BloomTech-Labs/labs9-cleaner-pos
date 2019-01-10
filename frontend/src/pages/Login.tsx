import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
import { RouteProps } from 'react-router';
import firebase, { Unsubscribe } from 'firebase/app';
import app from '../firebase.setup';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Login: FunctionComponent = (props: RouteProps) => {
  const [user, setUser] = useState<object | null>(null);
  const observerRef = useRef<Unsubscribe>(null);

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
    // @ts-ignore
    observerRef.current = app.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
    // Removes the observer set up above
    // @ts-ignore
    return () => observerRef.current();
    //   };
  }, []);

  return (
    <div>
      <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </div>
  );
};

export default Login;
