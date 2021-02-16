const axios = require('axios');
const config = require('../config.js');

const mongoose = require('../database');

let getReposByUsername = (username, cb) => {
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
  .then((response) => {
    // console.log('WHATUP', response.data);
    //call save() from database - save relevant data from GitHub API into database
    mongoose.save(response.data);
  })
  .then(() => {
    cb();
  });
}

//helper function to call function from database
let getTopRepos = (req, res) => {
  console.log('reached second server step');
  mongoose.returnTop(req, res);
}

module.exports.getReposByUsername = getReposByUsername;

module.exports.getTopRepos = getTopRepos;