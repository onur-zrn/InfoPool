import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "../api/apiCalls";
import { useTranslation } from 'react-i18next';

const Activation = () => {
  const { token } = useParams();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const {i18n } = useTranslation();

  useEffect(() => {
    async function activate() {
      setApiProgress(true);
        let response = await activateUser(token,i18n.language);
        let result = await response.json();
        if (response.ok) {
        setSuccessMessage(result.message);
        } else {
        setErrorMessage(result.message);
        }
        setApiProgress(false);
      }
    activate();
  }, []);

  return (
    <>
    <div className="container">
      {apiProgress && (
        <span className="spinner-border" aria-hidden="true"></span>
      )}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
    </>
  );
};

export default Activation;