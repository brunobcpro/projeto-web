let axios = require("axios")

axios.get('http://localhost:3000/')
    .then(response => console.log(response))
    .catch(error => console.log(error))