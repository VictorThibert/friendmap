set database=friendmap;

CREATE TABLE profile(
 id SERIAL PRIMARY KEY,
 picture VARCHAR(50),
 bio VARCHAR(1000),
 username VARCHAR(15),
 password VARCHAR(124),
 creation TIMESTAMP,
 email VARCHAR(32)
);
