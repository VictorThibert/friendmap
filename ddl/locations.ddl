set database=friendmap;

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
