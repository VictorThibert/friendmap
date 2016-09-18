set database=friendmap;

CREATE TABLE friends(
 id SERIAL PRIMARY KEY REFERENCES profile,
 friendID INT NOT NULL
);
