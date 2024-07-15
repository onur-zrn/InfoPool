import React from 'react';
import { useTranslation  } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';
import trflag from "../assets/images/trflag.png";
import enflag from "../assets/images/enflag.png";

const LanguageSelector = props => {
  const { i18n } = useTranslation();

  const onChangeLanguage = language => {
    //window.location.reload();
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
            <img
              src={trflag}
              alt="Turkish Flag"
              height="20"
              width="20"
              onClick={() => onChangeLanguage('tr')}
              style={{ cursor: 'pointer', marginRight:2}}
            ></img>
            <img
              src={enflag}
              alt="USA Flag"
              height="20"
              width="20"
              onClick={() => onChangeLanguage('en')}
              style={{ cursor: 'pointer' }}
            ></img>
    </div>
  );
};

export default LanguageSelector;