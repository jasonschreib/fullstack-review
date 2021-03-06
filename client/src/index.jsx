import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  //create a getRepos fetch function
  fetchRepos() {
    fetch('/repos')
    .then((res) => {
      return res.json()
    }).then((results) => {
      console.log(results);
      this.setState({ repos: results });
    })
  }

  //render the top 25 repos as soon as the page loads
  componentDidMount() {
    this.fetchRepos();
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    //initiate an ajax post request with the term as data
    //^^use the ajax post method to directly send a post
    $.post('/repos', { 'searchTerm': term })
      .done(() => {
        console.log('This was a successful post');
        this.fetchRepos();
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
      <ul>
        {this.state.repos.map((repo) =>
          (
            <li key={repo.repoId}>Repo name: {repo.repoName}
              <ul>
                <li>User: {repo.nameOfUser}</li>
                <li>Repo ID: {repo.repoId}</li>
                <li>URL: <a href={repo.repoUrl}>{repo.repoUrl}</a></li>
                <li>Forks: {repo.forks_count}</li>
                <li>Watchers: {repo.watchers_count}</li>
                <li>Composite Score: {repo.composite_score}</li>
              </ul>
            </li>
          )
        )}
      </ul>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));