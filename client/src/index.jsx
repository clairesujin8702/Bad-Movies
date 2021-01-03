import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import axios from 'axios';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };

    // you might have to do something important here!
    this.swapFavorites = this.swapFavorites.bind(this);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getMovies();
  }

  getMovies() {
    console.log('getMovies is working')
    // make an axios request to your server on the GET SEARCH endpoint
    return axios.get("/search")
      .then(res =>{
         this.setState({ movies : res.data})
         console.log('this.state.movies :',this.state.movies)
      })
      .catch(err => console.log(err))
  }
  getFMovies(){
    axios.get('/favorites')
    .then(res => this.setState({favorites : res.data}))
    .catch(err => console.log(err))
  }

  saveMovie(favoriteMovie) {
    console.log('saveMovie :', favoriteMovie)
    axios.post('/save', favoriteMovie)
      .then(res => {
        this.getFMovies();
        console.log('this.state.favorites added!');
      })
      .catch(err=> console.log(err))
  }

  deleteMovie(eid) {
    console.log('deleteMovie :', eid)
    axios({
      method: 'POST',
      url: '/delete',
      data: { id: eid }
    })
      .then(res => {
      this.getFMovies();
      console.log('this.state.favorites deleted!');
    })
    .catch(err=> console.log(err))
  }

  swapFavorites() {
    console.log('swapFavorites is working')
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
    this.getFMovies();
  }

  handleClickChange(e, eName){
    console.log('handleClickChange :', eName)
    const { name, value } = e.target;
    !eName ? this.setState({
      [name] : value
    }) : this.setState({
      [eName] : value
    });
  }

  handleSubmit(e, eId, eMovie, deleteId){
    console.log('handleSubmit :', eId, eMovie)
    if(eId){
      axios.get('/search', {params : { genreId : eId }})
      .then(res=>{
        this.setState({
          movies : res.data,
          showFaves : false
         })
        console.log('this.state.movies : ',this.state.movies);
      })
      .catch(err=> console.log(err))
    } else if (eMovie){
      this.saveMovie(eMovie);
    } else if (deleteId){
      this.deleteMovie(deleteId);
    }
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search
          swapFavorites={this.swapFavorites}
          showFaves={this.state.showFaves}
          handleSubmit={this.handleSubmit} />

          <Movies
          movies={this.state.showFaves ? this.state.favorites : this.state.movies}
          showFaves={this.state.showFaves}
          handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));