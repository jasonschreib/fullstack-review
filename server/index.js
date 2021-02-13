const github = require('../helpers/github.js');

const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

//use the json bodyparser to be able to recognize incoming req object as string
app.use(express.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('REQBODY', req.body);
  //call getReposByUsername() -> will fetch a user's repositories from the GitHub API
  github.getReposByUsername(req.body.searchTerm);
  //send a response back to client
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

