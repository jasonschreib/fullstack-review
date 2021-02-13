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
  watchers_count: {type: Number}
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
      //if no document is found
      if (result === null) {
        //create brand new document from the model
        const doc = new Repo(
          { nameOfUser: fetchData[i].owner.login,
            repoName: fetchData[i].name,
            repoUrl: fetchData[i].html_url,
            repoId: fetchData[i].id,
           forks_count: fetchData[i].forks_count,
           watchers_count: fetchData[i].watchers_count }
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
        console.log('HERE', fetchData[0]);
          Repo.update({nameOfUser: fetchData[i].owner.login,
            repoId: fetchData[i].id},
            {forks_count: fetchData[i].forks_count, watchers_count: fetchData[i].watchers_count},
            {},
            function(err, results) {
              ///error check
              if (err) {
                console.log(err);
              }
              console.log('SUCESS');
            });
      }
    });
  }
}



module.exports.save = save;


