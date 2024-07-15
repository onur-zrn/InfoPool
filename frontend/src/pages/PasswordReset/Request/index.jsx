import { Input2 as Input } from "../../../components/input";
import { usePasswordResetRequest } from "./PasswordResetRequest";
import { Button }  from "../../../components/ButtonWithProgress";
import { useTranslation  } from 'react-i18next';

export function PasswordResetRequest() {
  const {onSubmit, onChangeEmail, apiProgress, success, error, generalError} = usePasswordResetRequest();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" >
          <div className="card-header text-center">
            <span className="fs-3"> {t('Reset your password')}</span>
          </div>
          <div className="card-body">
            <Input
              name="email"
              label="E-mail"
              error={error}
              onChange={onChangeEmail}
            />
            {success && (
                <div className="mt-3 alert alert-success">{success}</div>
            )}
            {generalError && (
                <div className="mt-3 alert alert-danger">{generalError}</div>
                )}
            <div className="mt-3 text-center">
            <Button disabled={apiProgress} pendingApiCall={apiProgress} text={t('Reset')} onClick = {onSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}