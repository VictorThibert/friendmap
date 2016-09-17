set database=friendmap;

CREATE TABLE locations(
 id INT Primary Key REFERENCES profile,
 name VARCHAR(50),
 review VARCHAR(140),
 longitude FLOAT,
 latitude FLOAT,
 code VARCHAR(32)
);
