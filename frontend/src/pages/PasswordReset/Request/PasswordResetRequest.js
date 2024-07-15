import { useCallback, useState } from "react";
import { passwordResetRequest } from "../../../api/apiCalls";
import { useTranslation } from 'react-i18next';

export function usePasswordResetRequest() {
  const [apiProgress, setApiProgress] = useState(false);
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState();
  const [generalError, setGeneralError] = useState()
  const [errors, setErrors] = useState({});
  const {i18n } = useTranslation();

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccess();
    setErrors({});
    setGeneralError()
    try {
      const response = await passwordResetRequest({email},i18n.language);
      setSuccess(response.data.message);
    } catch (axiosError) {
      if(axiosError.response.data.status === 400) {
        setErrors(axiosError.response?.data.validationErrors);
      } else {
        setGeneralError(axiosError.response.data.message);
      }
    } finally {
      setApiProgress(false);
    }
  }, [email]);

  return {
    apiProgress,
    onChangeEmail: (event) => setEmail(event.target.value),
    onSubmit,
    success,
    error: errors.email,
    generalError
  };
}