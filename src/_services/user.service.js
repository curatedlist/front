export const userService = {
  create,
  update,
  login,
  getOrCreate,
  getByUsername
}

async function create(idToken, email) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "users/", requestOptions);
    const result = await res.json();
    return result.user;
  } catch (error) {
    console.error(error);
  }
}

async function update(idToken, id, values) {
  try {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "users/id/" + id, requestOptions);
    const result = await res.json();
    const user = result.user
    user.idToken = idToken
    return user;
  } catch (error) {
    console.error(error);
  }
}


async function login(idToken, email) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const loggedInUser = await fetch(process.env.REACT_APP_API_URL + "users/login", requestOptions);
  if (!loggedInUser.ok) {
    throw Error(loggedInUser.statusText);
  }
  try {
    const loggedInUserJson = await loggedInUser.json();
    return loggedInUserJson.user;
  } catch (error) {
    console.error(error);
  }
}

async function getOrCreate(idToken, email) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
    };
    const loggedInUser = await fetch(process.env.REACT_APP_API_URL + "users/login", requestOptions);
    if (!loggedInUser.ok) {
      const newUser = await userService.create(idToken, email);
      return newUser;
    }
    const loggedInUserJson = await loggedInUser.json();
    return loggedInUserJson.user;
  } catch (error) {
    console.error(error);
  }
}

async function getByUsername(username) {
  const userByUsername = await fetch(process.env.REACT_APP_API_URL + "users/username/" + username);
  if (!userByUsername.ok) {
    throw Error(userByUsername.statusText);
  }
  try {
    const userByUsernameJson = await userByUsername.json();
    return userByUsernameJson.user;
  } catch (error) {
    console.error(error);
  }
}
