const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template MESSAGES
 */
router.get('/:id', (req, res) => {
  // GET route code here
  // this gets all my links from the 
  // SELECT * FROM "conversation" where "user_id" ="req.user.id" order by "id";
console.log('this is my chat id', req.params.id)
  let queryText = `SELECT * FROM "message"
  WHERE "conversation_id" =$1
  ORDER BY "id";`; 
    pool.query(queryText,[req.params.id])
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
  const newMessage = req.body;
  console.log('this is the new Message' ,newMessage);

  const message = newMessage.message;
  const conversationId = newMessage.conversation_id;
console.log('this is the message added', message, conversationId);

  const queryText = `INSERT INTO "message" ( "message", "conversation_id")
  VALUES($1, $2);`;

  pool.query(queryText, [message, conversationId])
  .then((result) => {
      res.sendStatus(201);
  }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
  })

});


// Delete messages by id 
router.delete('/:id',  (req, res) => { //calling the database
    let messageId = req.params.id;
    console.log(messageId);
    let queryText = `DELETE FROM "message" WHERE "id" = $1;`; 
    pool.query(queryText, [messageId])
    .then((result) => {
        res.sendStatus(204);
    }).catch((err) => {
        res.sendStatus(500);
    })
});

//delete by id url/chat
// localhost:5000/songs/delete/2
router.delete('/chat/:id',  (req, res) => { //calling the database
    let conversationId = req.params.id;
    
    console.log('this is the convo id', conversationId);
    let queryText = `DELETE FROM "conversation" WHERE "id" = $1 AND "user_id"=$2;`; 
    pool.query(queryText, [ conversationId, req.user.id])
    .then((result) => {
        res.sendStatus(204);
    }).catch((err) => {
        res.sendStatus(500);
    })
});

// update messages to answer of a song

router.put('/:id', (req, res) => {
    let messageId = req.params.id;
    console.log('This inside the put: ', messageId);

    let queryText = `UPDATE "message" SET "is_answered" = NOT is_answered  
    WHERE "id" = $1;`

    pool.query(queryText, [ messageId])
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log('server error', err)
    })
})




module.exports = router;
