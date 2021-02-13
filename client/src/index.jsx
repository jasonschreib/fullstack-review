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

//render the top 25 repos as soon as the page loads
componentDidMount() {
  //send a get request to //repos

  //update the state with the response sent back
}


  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //initiate an ajax post request with the term as data
    //^^use the ajax post method to directly send a post
    $.post('/repos', {'searchTerm': term},
    function (data) {console.log('This was a successful post')});
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));