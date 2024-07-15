import { Input2 as Input } from "../../../components/input";
import { useSetPassword } from "./useSetPassword";
import { Button }  from "../../../components/ButtonWithProgress";
import { useTranslation  } from 'react-i18next';

export function SetPassword() {
  const {apiProgress, errors, generalError, onChangePassword, onChangePasswordRepeat, onSubmit, success, disabled} = useSetPassword();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card">
          <div className="card-header text-center">
            <span className="fs-3">{t('Set your password')}</span>
          </div>
          <div className="card-body">
            <Input
              name="password"
              label={t('Password')}
              error={errors.password}
              type="password"
              onChange={onChangePassword}
            />
            <Input
              name="passwordRepeat"
              label={t('Password Repeat')}
              error={errors.passwordRepeat}
              type="password"
              onChange={onChangePasswordRepeat}
            />
            {success && (
              <div className="mt-3 alert alert-success">{success}</div>
            )}
            {generalError && (
             <div className="m-3 alert alert-danger">{generalError}</div>
            )}
            <div className="mt-3 text-center">
              <Button disabled={disabled} pendingApiCall={apiProgress} text={t('Reset')} onClick = {onSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}