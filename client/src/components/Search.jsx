import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres : [],
      selectedGenreId : ''
    };

    this.handleClickChange = this.handleClickChange.bind(this);
  }

  componentDidMount(){
    this.getGenres();
  }

  getGenres() {
    console.log('getGenres is working')
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    return axios.get('/genres')
      .then(res =>{
         this.setState({
          genres : res.data,
          selectedGenreId : res.data[0].id
        })
         console.log('this.state.genres :', this.state.genres)
      })
      .catch(err => console.log(err))
  }

  handleClickChange(e){
    // console.log('handleClickChange :', e)
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  render() {
    const genres = this.state.genres.map((genre, i)=> (<option value={ genre.id } key={i}> { genre.name } </option>))
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}> {this.props.showFaves ? "Show Results" : "Show Favorites"} </button>
        <br/><br/>

        <select name="selectedGenreId" onChange={this.handleClickChange}>
          { genres }
        </select>
        <br/><br/>

        <button name="showFaves" onClick={(e)=>this.props.handleSubmit(e, this.state.selectedGenreId)}>Search</button>

      </div>
    );
  }
}

export default Search;