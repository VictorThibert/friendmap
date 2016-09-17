set database=friendmap;

CREATE TABLE friends(
 id INT PRIMARY KEY REFERENCES profile,
 friendID INT NOT NULL
);
