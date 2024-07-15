import React from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import HomePage from '../pages/HomePage';
import Activation from '../pages/Activation';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import { PasswordResetRequest } from "../pages/PasswordReset/Request/";
import { SetPassword } from "../pages/PasswordReset/Reset";

const App = () => {
  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          {!isLoggedIn && <Route path="/signup" component={UserSignupPage} />}
          <Route path="/user/:username" component={UserPage} />
          <Route path="/Activation/:token" component={Activation} />
          <Route path="/password-reset/request" component={PasswordResetRequest} />
          <Route path="/password-reset/:token" component={SetPassword} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div >
  );
};

export default App;