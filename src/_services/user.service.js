import { handleErrors } from '_helpers/handleErrors'

export const userService = {
  create,
  update,
  login,
  getOrCreate,
  getByUsername
}

// The backend derives the email from the verified Google token, so no body is needed.
async function create(idToken) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "users/", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.user;
}

async function update(idToken, id, values) {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "users/id/" + id, requestOptions).then(handleErrors);
  const result = await res.json();
  const user = result.user
  user.idToken = idToken
  return user;
}


async function login(idToken) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const loggedInUser = await fetch(process.env.REACT_APP_API_URL + "users/login", requestOptions).then(handleErrors);
  const loggedInUserJson = await loggedInUser.json();
  return loggedInUserJson.user;
}

async function getOrCreate(idToken) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const loggedInUser = await fetch(process.env.REACT_APP_API_URL + "users/login", requestOptions);
  if (!loggedInUser.ok) {
    const newUser = await userService.create(idToken);
    return newUser;
  }
  const loggedInUserJson = await loggedInUser.json();
  return loggedInUserJson.user;
}

async function getByUsername(username) {
  const userByUsername = await fetch(process.env.REACT_APP_API_URL + "users/username/" + username).then(handleErrors);
  const userByUsernameJson = await userByUsername.json();
  return userByUsernameJson.user;
}
