import React, { useState, useEffect } from 'react';
import Input from '../components/input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

const LoginPage = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  //const key = "6LcXofgoAAAAAJCUNbrFpqI7HALVw1iCInxyme69" 
  const key = "6Lf1s_goAAAAAIHP6US2H7Zvjpo39KTrXcos1eYw" //v3
  const dispatch = useDispatch();

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false)

  function onChange(value) {
    setIsCaptchaSuccess(true)
    console.log("captcha value: ", value);
  }

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async event => {
    event.preventDefault();
    const creds = {
      username,
      password
    };

    const { history } = props;
    const { push } = history;


    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push('/')
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t, i18n } = useTranslation();

  const pendingApiCall = useApiProgress('post', '/api/1.0/auth');

  const buttonEnabled = username && password;

  return (
    <div className="container" >
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className='card'>
          <div className="text-center card-header">
            <h1>{t('Login')}</h1>
          </div>
          <div className="card-body">
            <Input label={t('Username')} onChange={event => setUsername(event.target.value)} />
            <Input label={t('Password')} type="password" onChange={event => setPassword(event.target.value)} />
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
            <ReCAPTCHA
              className='mt-3'
              sitekey={key}
              size="normal"
              hl={i18n.language}
              theme='light'
              onErrored={(e) => { console.log('e', e) }}
              onExpired={(e) => { console.log('ex', e) }}
              onChange={onChange} />
            <div className="mt-3 text-center">
              <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall || !isCaptchaSuccessful} pendingApiCall={pendingApiCall} text={t('Login')} />
            </div>
          </div>
          <div className="card-footer text-center">
            <Link to="/password-reset/request">Forget password?</Link>
          </div>
        </form>

      </div>

    </div>

  );
};


export default LoginPage;
