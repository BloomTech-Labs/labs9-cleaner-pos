import axios from 'axios';
import firebase, { Unsubscribe } from 'firebase/app';
import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../firebase.setup';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
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

  useEffect(
    () => {
      console.log('user!');
      submitUser();
    },
    [user],
  );

  async function submitUser() {
    if (user) {
      try {
        const { data } = await axios.post(
          'https://cleaner-pos.herokuapp.com/users/',
          user,
        );
        if (data.first) {
          props.history.push('/postreg');
        }
        localStorage.setItem('token', data.token);
      } catch (e) {
        throw e;
      }
      console.log(user);
    }
  }
  return (
    <div>
      <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </div>
  );
};

export default Login;
