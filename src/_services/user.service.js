export const userService = {
  create,
  getOrCreate,
  getByEmail,
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
    return result.user;
  } catch (error) {
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
  } catch (error) {
    console.error(error);
  }
}

async function getByEmail(email) {
  const userByEmail = await fetch(process.env.REACT_APP_API_URL + "users/email/" + email);
  if (!userByEmail.ok) {
    throw Error(userByEmail.statusText);
  }
  try {
    const userByEmailJson = await userByEmail.json();
    return userByEmailJson.user;
  } catch (error) {
    console.error(error);
  }
}

async function getByUsername(username) {
  const userByUsername = await fetch(process.env.REACT_APP_API_URL + "users/username/" + username);
  if (!userByUsername.ok) {
    throw Error(userByUsername.statusText);
  }
  try {
    const userByUsernameJson = await userByUsername.json();
    return userByUsernameJson.user;
  } catch (error) {
    console.error(error);
  }
}
