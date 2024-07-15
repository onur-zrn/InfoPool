import axios from 'axios';

export const signup = (body, language) => {
  return axios.post("/api/1.0/users/signup", body, { headers: { 'accept-language': `${language}` } });
  //return axios.post("/api/1.0/users/signup", body, { headers: { 'accept-language': 'en' } });
  //return axios.post('/api/1.0/users/signup', body);
};

export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] = language;
  localStorage.setItem("language",language)
};

export const activateUser2 = (token, language) => {
  return axios.patch(`/api/1.0/users/${token}`,{ headers: { 'accept-language': `${language}` } });
};

export const activateUser = (token, language) => {
  return (
      fetch(`/api/1.0/users/${token}`,{
      method: 'PATCH',
      headers: {
        'accept-language': `${language}`
        }
      })
  )
};   

export const login = creds => {
  return axios.post('/api/1.0/auth', {}, { auth: creds });
};

export const passwordResetRequest = (body, language) => {
  return axios.post('/api/1.0/users/password-reset', body, { headers: { 'accept-language': `${language}` } });
};

export const resetPassword = (token, body, language) => {
  return axios.patch(`/api/1.0/users/${token}/password`, body, { headers: { 'accept-language': `${language}` } });
};

export const getUser = username => {
  return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username, body, language) => {
  return axios.put(`/api/1.0/users/${username}`, body, { headers: { 'accept-language': `${language}` } });
};

export const getUsers = (page = 0, size = 10) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

