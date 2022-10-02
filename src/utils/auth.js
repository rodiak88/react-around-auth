export const BASE_URL = 'https://register.nomoreparties.co';

const checkServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkServerResponse(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkServerResponse(res);
    })
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('email', data.email);
      return data;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkServerResponse(res);
  });
};
