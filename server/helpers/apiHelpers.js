const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
const api ={
Genre : ()=>{
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${ API_KEY }&language=en-US`
  })
    .then(res=>{
      console.log(res.data.genres)
      // { genres: [ { id: 28, name: 'Action' },{ id: 12, name: 'Adventure' }] }
      return res.data.genres
    })
    .catch(err=> console.log(err))
},
Search : ( genreId )=>{
  return axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${ API_KEY }&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&with_genres=${ genreId }`
  })
    .then(res=>{
      console.log(res.data)
      // [ 'page', 'results', 'total_pages', 'total_results' ]
      return res.data.results
    })
    .catch(err=> console.log(err))
}
}

module.exports = api;