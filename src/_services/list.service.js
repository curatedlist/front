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
  try {
    let url = new URL(process.env.REACT_APP_API_URL + "lists/");
    url.search = new URLSearchParams({ 'filter_by': filter }).toString();
    const res = await fetch(url);
    const result = await res.json();
    return result.lists;
  } catch (error) {
    console.error(error);
  }
}

async function getListsByUsername(username, section) {
  try {
    let url = new URL(process.env.REACT_APP_API_URL + "users/username/" + username + "/" + section)
    const res = await fetch(url);
    const result = await res.json();
    return result.lists;
  } catch (error) {
    console.error(error);
  }
}

async function get(list_id) {
  try {
    let url = new URL(process.env.REACT_APP_API_URL + "lists/id/" + list_id)
    const res = await fetch(url);
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}

async function create(idToken, data) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/", requestOptions);
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}

async function deleteList(idToken, list_id) {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id, requestOptions);
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}

async function fav(idToken, list_id) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/fav", requestOptions).then(handleErrors)
    const result = await res.json();
    return result.list;
  } catch (error) {
    throw error;
  }
}

async function unfav(idToken, list_id) {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/unfav", requestOptions)
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}

async function addItem(idToken, list_id, values) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/", requestOptions)
    const result = await res.json();
    return result.item;
  } catch (error) {
    console.error(error);
  }
}

async function deleteItem(idToken, list_id, item_id) {
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/" + item_id + "/delete", requestOptions);
    const result = await res.json();
    return result.item;
  } catch (error) {
    console.error(error);
  }
}