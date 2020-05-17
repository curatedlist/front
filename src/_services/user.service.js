export const userService = {
  getById,
  getByUsername
}

function getById(id) {
  return fetch(process.env.REACT_APP_API_URL + "users/id/" + id)
    .then(res => res.json())
    .then(result => { return result })
}

function getByUsername(username) {
  return fetch(process.env.REACT_APP_API_URL + "users/username/" + username)
  .then(res => res.json())
  .then(result => { return result })
}
