const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  // this gets all my links from the db and username for the admin

  const queryText = `SELECT "user"."id", "user"."username", "conversation"."url" FROM "user"
  JOIN "conversation" ON "conversation"."user_id" = "user"."id";`
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error getting all users and chats', err);
      res.sendStatus(500);
    });
});

/**
 * DELETE route template
 */

//delete by id 
// localhost:5000/songs/delete/2
router.delete('/:id',  (req, res) => { //calling the database
    let conversationId = req.params.id;
    console.log(conversationId);
    let queryText = `DELETE FROM "conversation" WHERE "id" = $1;`; 
    pool.query(queryText, [conversationId])
    .then((result) => {
        res.sendStatus(204);
    }).catch((err) => {
        res.sendStatus(500);
    })
});
  

module.exports = router;
