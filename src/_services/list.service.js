export const listService = {
  create,
  getAll
}

function create(data) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(data)),
    headers: { 'Content-Type': 'application/json' }
  }
  return fetch(process.env.REACT_APP_API_URL + "lists/", requestOptions)
    .then(res => res.json())
    .then((result) => {
      return result
    });
}

function getAll() {
  return fetch(process.env.REACT_APP_API_URL + "lists/")
    .then(res => res.json())
    .then((result) => {
      return result
    })
}
