const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  // this gets all my links from the 
  // SELECT * FROM "conversation" where "user_id" ="req.user.id" order by "id";
console.log('this is my user', req.user)
  let queryText = `SELECT * FROM "conversation" WHERE "user_id"=$1 ORDER BY "id";`; 
    pool.query(queryText,[req.user.id])
    .then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        res.sendStatus(500);
    })

});

/**
 * POST route template
 */

router.post('/', (req, res) => {
  // POST route code here
  const newLink = req.body;
  console.log('this is the body' ,newLink);


  const url ="blah";
  const userId = req.user.id;
console.log('this is the url', url);

  const queryText = `INSERT INTO "conversation" ("url", "user_id")
  VALUES($1, $2) RETURNING "id","url";`;

  pool.query(queryText, [url, userId])
  .then((result) => {
    res.send(201);
  })
});

module.exports = router;
