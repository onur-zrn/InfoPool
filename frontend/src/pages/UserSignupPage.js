import React, { useState } from 'react';
import Input from '../components/input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    email: null,
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState();
  const [generalError, setGeneralError] = useState();

  const dispatch = useDispatch();

  const onChange = event => {
    const { name, value } = event.target;

    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async event => {
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();

    const { history } = props;
    const { push } = history;

    const { email, username, displayName, password } = form;

    const body = {
      email,
      username,
      displayName,
      password,
    };

    try {
      const response = await dispatch(signupHandler(body, i18n.language));
      //push('/');
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
      else {
        setGeneralError(error.response.data.message);
      }
    }
  };

  const { t, i18n } = useTranslation();
  let { email: emailError, username: usernameError, displayName: displayNameError, password: passwordError } = errors;
  const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users/signup');
  const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');

  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t('Password mismatch');
  }

  return (
    <div className='container'>
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className='card' >
          <div className="text-center card-header">
            <h1>{t('Sign Up')}</h1>
          </div>
          <div className="card-body">
            <Input name="email" label={t("Email")} error={emailError} onChange={onChange} />
            <Input name="username" label={t("Username")} error={usernameError} onChange={onChange} />
            <Input name="displayName" label={t("Display Name")} error={displayNameError} onChange={onChange} />
            {/* <div>
              <label>Username</label>
              <input className={username ? "form-control is-invalid" : 'form-control'} name="username" onChange={this.onChange}/>
              <div className="invalid-feedback"> {username} </div>
            </div> */}
            <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password" />
            <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} onChange={onChange} type="password" />

            {successMessage && (
              <div className="mt-2 alert alert-success">{successMessage}</div>
            )}
            {generalError && (
              <div className="mt-2 alert alert-danger">{generalError}</div>
            )}

            <div className='mt-3 text-center'>
              <ButtonWithProgress
                onClick={onClickSignup}
                disabled={pendingApiCall || passwordRepeatError !== undefined}
                pendingApiCall={pendingApiCall}
                text={t('Sign Up')}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignupPage;
