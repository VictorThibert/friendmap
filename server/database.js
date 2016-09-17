
var pg = require('pg');

//config of the connection
var config = {
  user: 'root', //env var: PGUSER
  database: 'fuck', //env var: PGDATABASE
  host: '45.55.166.191',
  // host: 'localhost',
  //password: 'secret', //env var: PGPASSWORD
  port: 26257 //env var: PGPORT
};

// export function that can be used to make a generic query and a callback
module.exports = function(queryString, callback){
  pg.connect(config, function(err, client, done){
    if(err){
      console.error('could not connect to cockroachdb', err);
      done();
    }
    client.query(queryString, callback);
  })
}
