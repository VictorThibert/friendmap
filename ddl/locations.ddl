CREATE TABLE locations(
 id INT NOT NULL REFERENCES profile,
 name VARCHAR(50),
 review VARCHAR(140),
 longitude FLOAT,
 latitude FLOAT,
 code VARCHAR(32)
)
