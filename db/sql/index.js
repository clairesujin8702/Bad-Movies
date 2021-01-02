const mysql = require('mysql');
const mysqlConfig = require('../../config.js');
const Promise = require('bluebird');
const myDataBase = 'badmovies';

const connection = mysql.createConnection(mysqlConfig);

const db = Promise.promisifyAll( connection, {multiArgs : true} );

db.connectAsync()
  .then(()=>console.log(`Connected to MySQL database "${myDataBase}"`) )
  .then(()=> db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${myDataBase};`))
  .then(()=> db.queryAsync(`USE ${myDataBase};`))
  .then(()=> db.queryAsync(`CREATE TABLE IF NOT EXISTS favoriteList(id INT AUTO_INCREMENT, title VARCHAR(50) NOT NULL, overview VARCHAR(500), poster_path VARCHAR(200), genre VARCHAR(50) NOT NULL, vote INT NOT NULL , PRIMARY KEY(id));`))
  .catch((err)=> console.log(err))

const dbMethods ={
  ReadAll : () => {
    return db.queryAsync( 'SELECT * from favoriteList' )
      .then(movieList=>{
        if(!movieList){
          throw Error( 'no favorite movie listed !' );
        }
        console.log(movieList[0])
        return movieList[0];
      })
      .catch(err=>console.log(err))
  },
  ReadOne : ( id ) => {
    if(!id){ throw Error( 'Info is invalid, please try again' ); }

    return db.queryAsync( `SELECT * from favoriteList WHERE id = ${id}` )
      .then(movie=>{
        if(!movie){
          throw Error( 'not listed on favorites !' );
        }

        console.log(movie[0][0])
        return movie[0][0];
      })
      .catch(err=>console.log(err))
  },
  // Create : ( title, overview, poster_path, genre_ids, popularity ) => {
  //   if(!title || !popularity || !genre_ids){ throw Error( 'Info is invalid, please try again' ); }
  //   console.log('create : ', title, overview, poster_path, genre_ids, popularity)

  //   return db.queryAsync( `INSERT INTO favoriteList (title, overview, poster_path, genre, vote) values ("${title}","${overview}","${poster_path}","${genre_ids}","${popularity}");` )
  //     .then(()=> {return 'Success to add a movie to favorites!';} )
  //     .catch(err=> console.log(err))
  // },
  Create : ( fMovie ) => {
    if(!fMovie){ throw Error( 'Info is invalid, please try again' ); }
    console.log('create : ', fMovie)

    return db.queryAsync( `INSERT INTO favoriteList (title, overview, poster_path, genre, vote) values ("${fMovie.title}","${fMovie.overview}","${fMovie.poster_path}","${fMovie.genre_ids}","${fMovie.popularity}");` )
      .then(()=> {return 'Success to add a movie to favorites!';} )
      .catch(err=> console.log(err))
  },
  Delete : ( id ) => {
    if(!id){ throw Error( 'Info is invalid, please try again' ); }

    return db.queryAsync( `DELETE FROM favoriteList WHERE id = ${id};` )
    .then(()=> {return 'Success to delete a movie from favorites!';} )
    .catch(err=> console.log(err))
  }
}

module.exports = dbMethods;