import { useCallback, useState } from "react";
import { resetPassword } from "../../../api/apiCalls";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
export function useSetPassword() {
  const [apiProgress, setApiProgress] = useState(false);
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [success, setSuccess] = useState();
  const [generalError, setGeneralError] = useState()
  const [errors, setErrors] = useState({});
  const {i18n } = useTranslation();

  //const navigate = useHistory()

  const { token } = useParams();
  //const history = useHistory()

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccess();
    setErrors({});
    setGeneralError()
    try {
      const response = await resetPassword(token, { password }, i18n.language);
      setSuccess(response.data.message);
      //history.push("/login")
    } catch (axiosError) {
      if(axiosError.response.data.status === 400) {
        setErrors(axiosError.response?.data.validationErrors);
      } else {
        setGeneralError(axiosError.response.data.message);
      }
    } finally {
      setApiProgress(false);
    }
  }, [password, useParams,i18n.language]);
  
  return {
    apiProgress,
    onChangePassword: (event) => {
      setPassword(event.target.value);
      setErrors({});
    },
    onChangePasswordRepeat: (event) => setPasswordRepeat(event.target.value),
    onSubmit,
    success,
    errors: {
      password: errors.password,
      passwordRepeat: password !== passwordRepeat ? 'Password mismatch' : ''
    },
    generalError,
    disabled: password ? password !== passwordRepeat : true

  };
}