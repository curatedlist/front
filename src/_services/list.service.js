export const listService = {
  getAll,
  getListsByUsername,
  get,
  create,
  fav,
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

async function create(data) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/", requestOptions);
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}

async function fav(list_id, user_id) {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }
    var url = new URL(process.env.REACT_APP_API_URL + "lists/" + list_id + "/fav")
    url.search = new URLSearchParams({ 'user_id': user_id.toString() }).toString();
    const res = await fetch(url, requestOptions)
    const result = await res.json();
    return result.list;
  } catch (error) {
    console.error(error);
  }
}


async function addItem(list_id, values) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/", requestOptions)
    const result = await res.json();
    return result.item;
  } catch (error) {
    console.error(error);
  }
}

async function deleteItem(list_id, item_id) {
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/items/" + item_id + "/delete", requestOptions);
    const result = await res.json();
    return result.item;
  } catch (error) {
    console.error(error);
  }
}