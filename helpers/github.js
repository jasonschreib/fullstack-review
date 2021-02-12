const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username +'/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  //make a get request using the axios module
  axios.get('https://api.github.com/users/' + username +'/repos', options)
  //this returns a promise so console.log it after to see what it returns
  .then((response) => {
    console.log('WHATUP', response);
  });
}

module.exports.getReposByUsername = getReposByUsername;