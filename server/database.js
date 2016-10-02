var pg = require('pg');
var Pool = require('pg').Pool;

//config of the connection
var config = {
  user: 'root', //env var: PGUSER
  database: 'friendmap', //env var: PGDATABASE
  host: '45.55.166.191',
  // host: 'localhost',
  //password: 'secret', //env var: PGPASSWORD
  port: 26257 //env var: PGPORT
};

var pool = new Pool(config);

// export function that can be used to make a generic query and a callback
module.exports = function(queryString, callback){
  pool.query(queryString, callback);
}



// // export function that can be used to make a generic query and a callback
// module.exports = function(queryString, callback){
//   console.log("going to start connecting to the database");
//   pg.connect(config, function(err, client, done){
//     if(err){
//       console.error('could not connect to cockroachdb', err);
//       done();
//     }else console.log("connected to cockroachdb");
//     client.query(queryString, callback);
//   })
// }
