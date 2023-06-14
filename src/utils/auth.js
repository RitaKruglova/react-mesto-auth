import { checkResponse } from "./utils";

export const baseUrl = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then(res => res)
    .catch(err => {
      console.log(err)
    })
}

export function authorise(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then(data => {
      localStorage.setItem('jwt', data.token);
      return;
    })
    .catch(err => console.log(err))
}

export function getToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(checkResponse)
    .then(data => data)
    .catch(err => {
      console.log(err)
    })
}