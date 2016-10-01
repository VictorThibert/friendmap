create database if not exists friendmap;
set database=friendmap;

CREATE TABLE profile(
 id SERIAL PRIMARY KEY,
 picture VARCHAR(50),
 bio VARCHAR(1000),
 username VARCHAR(15),
 password VARCHAR(32),
 creation TIMESTAMP,
 email VARCHAR(32)
);

CREATE TABLE location(
 id SERIAL Primary Key,
 profileId Int REFERENCES profile(id),
 name VARCHAR(50),
 review VARCHAR(140),
 longitude FLOAT,
 latitude FLOAT,
 code VARCHAR(32),
 INDEX(profileId)
);

CREATE TABLE friends(
 id SERIAL PRIMARY KEY REFERENCES profile,
 friendID INT NOT NULL
);
