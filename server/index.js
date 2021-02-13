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
  var topRepos = [];
  //access the database and sort based on the composite_score
  Repo.find({}).sort({ composite_score : -1 }).exec(function(err, results){
    //error check
    if (err) {
      console.log(err)
    }
    //log what gets returned
    console.log(results);
    //if the amount of repos in database is less than or equal to 25
    if (results.length <= 25) {
      //return them all in their sorted order
      topRepos = results;
    }
    ///otherwise return the first 25 repos by iterating and pushing to array
    for (var i = 0; i < 25; i++) {
      topRepos.push(results[i]);
    }
    //send this data back to the client
    res.send(topRepos)
   });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

