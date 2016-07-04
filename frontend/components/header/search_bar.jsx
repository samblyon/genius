const React = require('react');
const SongActions = require('../../actions/song_actions');
const SongsIndexItem = require('../song/songs_index_item');
const SongStore = require('../../stores/song_store')

const SearchBar = React.createClass({
  getInitialState() {
    return {
      query: "",
      results: SongStore.searchResults()
    };
  },

  componentDidMount(){
    this.resultsListener = SongStore.addListener(this._onSongsChange);
  },

  componentWillUnmount(){
    this.resultsListener.remove();
  },

  _onSongsChange(){
    this.setState({ results: SongStore.searchResults() });
  },

  handleChange(e){
    e.preventDefault();
    SongActions.fetchSongsByQuery(e.target.value);

    this.setState({ query: e.target.value });
  },

  render(){
    const results = this.state.results.map(result => {
      return <SongsIndexItem key={result.id} song={result} />
    });

    return(
      <div className="search-bar">
        <input type="text"
               value={this.state.query}
               onChange={this.handleChange}/>
        <div className="search-results">
          <ul>
            {results}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
