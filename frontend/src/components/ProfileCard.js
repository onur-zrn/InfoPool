import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = props => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
  // current user const { user } = useSelector(store => ({ user: store }));
  const routeParams = useParams();
  const pathUsername = routeParams.username;

  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const { username, displayName, image } = user;
  const { t, i18n  } = useTranslation();

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

    useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  const onClickSave = async () => {
    const body = {
      displayName: updatedDisplayName
    };
    try {
      const response = await updateUser(username, body, i18n.languages);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {}
  };

  const onChangeFile = event => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  
  const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
  
  return (
    <div className="card text-center">
      <div className="card-header">
      <ProfileImageWithDefault
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={`${username} profile`}
          image={image}
          tempimage={newImage}
        /> 
      </div>
      <div className="card-body">
        {!inEditMode && (
          <>
            <h3>
              {displayName}@{username}
            </h3>
            {editable && (
              <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                <i className="material-icons">edit</i>
                {t('Edit')}
              </button>
            )}
          </>
        )}
        {inEditMode && (
          <div>
            <Input
              label={t('Change Display Name')}
              defaultValue={displayName}
              onChange={event => {
              setUpdatedDisplayName(event.target.value);
              }}
            />
            <input type="file" onChange={onChangeFile} />
            <div className='mt-2'>
             <ButtonWithProgress
                className="btn btn-primary me-2	"
                onClick={onClickSave}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text={
                  <>
                    <i className="material-icons align-top">save</i>
                    {t('Save')}
                  </>
                }
              />
              <button className="btn btn-light d-inline-flex" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
                <i className="material-icons">close</i>
                {t('Cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;