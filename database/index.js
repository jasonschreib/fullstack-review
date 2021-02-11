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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;