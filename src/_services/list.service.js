export const listService = {
  getAll,
  getListsByUsername,
  create,
  fav
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
    const res = await fetch(process.env.REACT_APP_API_URL + "lists/" + list_id + "/fav?user_id=" + user_id, requestOptions);
    const result = await res.json();
    return result.lists;
  } catch (error) {
    console.error(error);
  }
}