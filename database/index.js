const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  nameOfUser: {
      type: String,
  required: true,
    unique: true
  },
  repoId: {type: Number, required: true, unique: true},
  repoName: {type: String, required: true, unique: true},
  repoUrl: {type: String, required: true, unique: true},
  forks_count: {type: Number, required: true},
  watchers_count: {type: Number, required: true}
});



let Repo = mongoose.model('Repo', repoSchema);

let save = (fetchData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('Im in Mongo save function');




  //send response data back to the server
}

module.exports.save = save;