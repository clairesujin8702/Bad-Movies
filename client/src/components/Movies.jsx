import React from 'react';
import MovieContent from './MovieContent.jsx';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    const movieList = !this.props.movies ? null : this.props.movies.map((movie, i)=>{
      return (<MovieContent movie={movie} key={i} showFaves={this.props.showFaves} handleSubmit={this.props.handleSubmit}/>)
    })
    return (
      <ul className="movies">
        {movieList}
      </ul>
    );
  }
}

export default Movies;