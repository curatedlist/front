// Services & Helpes
import { utils } from '_services/utils'

export const userService = {
  create,
  getOrCreate,
  getByEmail,
  getById,
  getByUsername
}

async function create(email, token) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, token: token })
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "users/", requestOptions);
    const result = await res.json();
    return result;
  }
  catch (error) {
    console.error(error);
  }
}

async function getOrCreate(email, token) {
  try {
    const userByEmail = await fetch(process.env.REACT_APP_API_URL + "users/email/" + email);
    const userByEmailJson = await userByEmail.json();
    if (userByEmailJson.status === 404) {
      const newUser = await userService.create(email, token);
      return newUser;
    }
    return userByEmailJson.user;
  }
  catch (error) {
    console.error(error);
  }
}

async function getByEmail(email) {
  try {
    const userByEmail = await fetch(process.env.REACT_APP_API_URL + "users/email/" + email);
    const userByEmailJson = await userByEmail.json();
    return userByEmailJson.user;
  }
  catch (error) {
    console.error(error);
  }
}

function getById(id) {
  return fetch(process.env.REACT_APP_API_URL + "users/id/" + id)
    .then(res => res.json())
    .then(result => { return result })
}

function getByUsername(username) {
  return fetch(process.env.REACT_APP_API_URL + "users/username/" + username)
    .then(utils.handleErrors)
    .then(res => res.json())
}
