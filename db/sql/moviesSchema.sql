-- SET UP SCHEMA HERE

CREATE DATABASE IF NOT EXISTS badmovies;
USE badmovies;
CREATE TABLE IF NOT EXISTS favoriteList(id INT AUTO_INCREMENT, title VARCHAR(50) NOT NULL, overview VARCHAR(500), poster_path VARCHAR(200), genre VARCHAR(50) NOT NULL, vote INT NOT NULL , PRIMARY KEY(id));

SELECT * from favoriteList
SELECT * from favoriteList WHERE id = ${};
INSERT INTO favoriteList (title, overview, poster_path, genre, vote) values ("${}","${}","${}","${}","${}");
DELETE FROM favoriteList WHERE id = ${};


DROP DATABASE badmovies;
DROP TABLE favoriteList;
DESCRIBE favoriteList;