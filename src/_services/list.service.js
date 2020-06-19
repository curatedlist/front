import { handleErrors } from '_helpers/handleErrors'

export const listService = {
  getAll,
  getListsByUsername,
  get,
  create,
  deleteList,
  fav,
  unfav,
  addItem,
  deleteItem,
};

async function getAll(filter) {
  let url = new URL(process.env.REACT_APP_API_URL + "lists/");
  url.search = new URLSearchParams({ 'filter_by': filter }).toString();
  const res = await fetch(url).then(handleErrors);
  const result = await res.json();
  return result.lists;
}

async function getListsByUsername(username, section) {
  let url = new URL(process.env.REACT_APP_API_URL + "users/username/" + username + "/" + section);
  const res = await fetch(url).then(handleErrors);
  const result = await res.json();
  return result.lists;
}

async function get(list_id) {
  let url = new URL(process.env.REACT_APP_API_URL + "lists/id/" + list_id);
  const res = await fetch(url).then(handleErrors);
  const result = await res.json();
  return result.list;
}

async function create(idToken, data) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(data)),
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.list;
}

async function deleteList(idToken, list_id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id, requestOptions).then(handleErrors);
  const result = await res.json();
  return result.list;
}

async function fav(idToken, list_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/fav", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.list;
}

async function unfav(idToken, list_id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/unfav", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.list;
}

async function addItem(idToken, list_id, values) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.item;
}

async function deleteItem(idToken, list_id, item_id) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
  };
  const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/" + item_id + "/delete", requestOptions).then(handleErrors);
  const result = await res.json();
  return result.item;
}