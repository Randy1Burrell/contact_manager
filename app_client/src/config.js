var get_api = function () {
  if (process.env.NODE_ENV === "production" ) {
    return 'https://calm-harbor-49946.herokuapp.com/api/contact/';
  } else {
    return 'http://localhost:3000/api/contact/';
  }
};

module.exports = {
  API: get_api()
}
