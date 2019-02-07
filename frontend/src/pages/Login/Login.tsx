import axios from 'axios';
import firebase, { Unsubscribe, User } from 'firebase/app';
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import { RouteComponentProps } from 'react-router';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../../firebase.setup';
// Styles
import Container from '../../components/Container';
import LoginDiv from './Login.styling';
import queryString from 'query-string';
import { UserContext } from '../../App';
import logo from '../../assets/lodgel.jpg';

interface LoginProps extends RouteComponentProps {
  onUser: any;
}

const Login: FunctionComponent<LoginProps> = ({ history, location }) => {
  // set's up user state
  const [user, setUser] = useState<User | null>(null);
  // creates a ref that will be used as component wide variable and exists
  // throughout it's lifecycle
  const observer: MutableRefObject<any> = useRef<Unsubscribe>(null);
  const { setRole } = useContext(UserContext);
  const { ast, manager } = queryString.parse(location.search);

  // Configuration for the firebase OAuth component
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
    // Set's up & removes listener to react to AuthStateChanges produced
    // by firebase
    observer.current = app
      .auth()
      .onAuthStateChanged((newUser) => setUser(newUser));
    return () => {
      if (observer.current !== null) {
        observer.current();
      }
    };
  }, []);

  useEffect(
    () => {
      // Listens to changes in userState and submits them
      // to our backend
      submitUser();
    },
    [user],
  );

  async function submitUser() {
    /* Commits user to the backend and redirects new users to
    either a page gathering additional information or their dashboard*/
    if (user !== null) {
      const { email, uid, displayName, photoURL } = user;
      const nUser = {
        email,
        ext_it: uid,
        full_name: displayName,
        photoUrl: photoURL,
        role: ast ? 'assistant' : 'manager',
        managerID: manager,
      };
      const url =
        process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
      try {
        const { data } = await axios.post(`${url}/users/`, nUser);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('subscription', data.stripePlan);

        if (data.first) {
          history.push('/postreg');
          setRole(ast ? 'assistant' : 'manager');
        } else {
          history.push('/properties');
        }
      } catch (e) {
        throw e;
      }
    }
  }

  return (
    <Container>
      <LoginDiv>
        <div className='login-container'>
          <img
            src={logo}
            alt='Lodgel Logo'
            // style={{ position: 'absolute', top: '0', left: '0' }}
          />
          <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        </div>
      </LoginDiv>
    </Container>
  );
};

export default Login;
