set database=friendmap;

CREATE TABLE profile(
 id INT PRIMARY KEY,
 picture VARCHAR(50),
 bio VARCHAR(1000),
 username VARCHAR(15),
 password VARCHAR(32),
 creation TIMESTAMP,
 email VARCHAR(32)
);
