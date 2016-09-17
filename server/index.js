var pg = require('pg');
var async = require('async');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools

var config = {
  user: 'root', //env var: PGUSER
  database: 'fuck', //env var: PGDATABASE
  host: '45.55.166.191',
  // host: 'localhost',
  //password: 'secret', //env var: PGPASSWORD
  port: 26257 //env var: PGPORT
};

pg.connect(config, function (err, client, done) {
  // Closes communication with the database and exits.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  async.waterfall([
    function (next) {
      // Insert two rows into the "accounts" table.
      client.query("INSERT INTO el (id, name) VALUES (1, 'pickle'), (2, 'bruh');", next);
    },
    function (results, next) {
      // Print out the balances.
      client.query('SELECT id, name FROM el;', next);
    },
  ],
  function (err, results) {
    if (err) {
      console.error('error inserting into and selecting from accounts', err);
      finish();
    }

    console.log('Initial balances:');
    results.rows.forEach(function (row) {
      console.log(row);
    });

    finish();
  });
});

