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

function getAll(filter) {
  let url = new URL(process.env.REACT_APP_API_URL + "lists/")
  url.search = new URLSearchParams({ 'filter_by': filter }).toString();
  return fetch(url)
    .then(res => res.json())
    .then((result) => {
      return result
    })
}

function fav(list_id, user_id) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }
  return fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/fav?user_id=" + user_id, requestOptions)
    .then(res => res.json())
    .then((result) => {
      return result
    });

}