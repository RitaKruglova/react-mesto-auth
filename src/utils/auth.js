export const baseUrl = 'https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => {
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error('Registration failed')
      }
    })
    .then(res => res)
    .catch(err => console.log(err))
}

export function authorise(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Authorization failed')
      }
    })
    .then(data => {
      localStorage.setItem('jwt', data.token);
      return;
    })
    .catch(err => console.log(err))
}