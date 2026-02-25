let api = "http://localhost:4040/api/users";
function fetchUsers() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
fetchUsers();