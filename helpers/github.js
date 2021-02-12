const axios = require('axios');
const config = require('../config.js');

const mongoose = require('../database');

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
  //^^this returns a promise
  //then with this response want to handle duplicates and update the repo that matches the user and repoName, or create brand new entry in database
  .then((response) => {
    console.log('WHATUP', response.data);
    //call save() from database - save relevant data from GitHub API into database
    mongoose.save(response.data);
  });

}

module.exports.getReposByUsername = getReposByUsername;