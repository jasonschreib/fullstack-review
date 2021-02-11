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
  //we get this response back
  //then with this response want to handle duplicates and update the repo that matches the user and repoName, or create brand new entry in database
  //send response data back to the server

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

