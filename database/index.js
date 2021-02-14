const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  nameOfUser: {
      type: String,
      unique: false
  },
  repoId: {type: Number, unique: true},
  repoName: {type: String},
  repoUrl: {type: String, unique: true},
  forks_count: {type: Number},
  watchers_count: {type: Number},
  composite_score: {type: Number}
});


let Repo = mongoose.model('Repo', repoSchema);


let save = (fetchData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('Im in Mongo save function');
  //iterate over the fetchData array
  for (let i = 0; i < fetchData.length; i++) {
    //establish a query for the find operation
    var query = Repo.find({nameOfUser: fetchData[i].owner.login,
                         repoId: fetchData[i].id}).lean().limit(1);
    //execute the query
    query.exec(function(err, result) {
      //error check
      if (err) {
        console.log(err);
      }
      // console.log('RESULT', result);
      //if no document is found
      if (result.length === 0) {
        //create brand new document from the model
        const doc = new Repo(
          { nameOfUser: fetchData[i].owner.login,
            repoName: fetchData[i].name,
            repoUrl: fetchData[i].html_url,
            repoId: fetchData[i].id,
           forks_count: fetchData[i].forks_count,
           watchers_count: fetchData[i].watchers_count,
          composite_score: 3 * fetchData[i].forks_count + fetchData[i].watchers_count}
        );
        //save the document
        doc.save((err, results) => {
          if (err) {
            console.log(err);
          }
          console.log('success');
        });
        //if the document is found, then update that document
      } else {
        console.log('HERE', fetchData[i]);
          Repo.update({nameOfUser: fetchData[i].owner.login,
            repoId: fetchData[i].id},
            {forks_count: fetchData[i].forks_count, watchers_count: fetchData[i].watchers_count, composite_score: 3 * fetchData[i].forks_count + fetchData[i].watchers_count},
            {},
            function(err, results) {
              ///error check
              if (err) {
                console.log(err);
              }
              console.log('SUCCESS');
            });
      }
    });
  }
}

let returnTop = (req, res) => {
  console.log('Reached db');
  var topRepos = [];
  //access the database and sort based on the composite_score
  Repo.find({}).sort({ composite_score : -1 })
  .then((results) => {
    console.log('In the then');
    //log what gets returned
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]._doc);
    }
    //if the amount of repos in database is less than or equal to 25
    if (results.length <= 25) {
      //return them all in their sorted order
      for (let i = 0; i < results.length; i++) {
        topRepos.push(results[i]._doc);
      }
    } else {
      //otherwise return the first 25 repos by iterating and pushing to array
      for (let i = 0; i < 25; i++) {
        topRepos.push(results[i]._doc);
      }
    }
    console.log('reached end of db');
    return topRepos;
  })
  .then((topRepos) => {
    //return the topRepos array
    console.log('TOP', topRepos);
    res.send(topRepos);
  });
}


module.exports.save = save;

module.exports.returnTop = returnTop;