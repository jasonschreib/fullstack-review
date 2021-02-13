const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  nameOfUser: {
      type: String,
  required: true,
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
  console.log('Im in Mongo save function', fetchData);
  //iterate over the fetchData array
  for (var i = 0; i < fetchData.length; i++) {
    //create a new document from the model for each index in fetchData array
    const doc = new Repo(
      {
        nameOfUser: fetchData[i].owner.login,
       repoId: fetchData[i].id,
       repoName: fetchData[i].name,
       repoUrl: fetchData[i].html_url,
       forks_count: fetchData[i].forks_count,
       watchers_count: fetchData[i].watchers_count
      }
    );
    doc.save((err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
    })
    //if an entry with the repo and username can be found
      //update that entry with new info
    //otherwise create a brand new entry


    }


  //send response data back to the server
}

module.exports.save = save;


    // Repo.findOne({ nameOfUser: fetchData[i].owner.login, repoId: fetchData[i].id })
    //   .then((exists) => {
    //     if (exists) {
    //       console.log('FOUND AN ENTRY', i)
    //       //otherwise entry not found
    //       //call FindOneAndUpdate function to update this entry
    //     } else {
    //       console.log('DIDNT FIND ENTRY', i)
    //       //add a new entry to database
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });