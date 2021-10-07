const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template MESSAGES
 */
router.get('/:urlid', (req, res) => {
  // GET route code here
  // this gets all my links from the 
  // SELECT * FROM "conversation" where "user_id" ="req.user.id" order by "id";
console.log('this is in line12 my chat id', req.params.urlid)
  let queryText = `SELECT * FROM "message"
  WHERE "conversation_id" = (SELECT "id" from "conversation" where "url" =$1)
  ORDER BY "id";`; 
    pool.query(queryText,[req.params.urlid])
    .then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log('thisis ',err)
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
  VALUES($1, (SELECT "id" FROM conversation Where "url"=$2));`;

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

router.put('/answer/:id', (req, res) => {
    let messageId = req.params.id;
    console.log('This inside the put: ', req.params.id);

    let queryText = `UPDATE "message" SET "is_answered" = NOT is_answered  
    WHERE "id" = $1;`

    pool.query(queryText, [ messageId])
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log('server error', err)
    })
})

router.put('/vote/:id', (req, res) => {
    let messageId = req.params.id;
    console.log('This inside the vote: ', req.params.id);
    // the direction can either be +1 or -1
    let direction = req.body.direction
    let queryText ='';

    if (direction === 'up'){
            // up voting 
        queryText = `UPDATE "message" SET "votes" = (SELECT "votes" FROM "message" WHERE "id"=$1 ) +1
        WHERE "id" = $1;`
    } else if (direction==='down'){
        queryText = `UPDATE "message" SET "votes" = (SELECT "votes" FROM "message" WHERE "id"=$1 ) -1
        WHERE "id" = $1;` 
    }
    console.log('this is my direction', direction, req.body)
    pool.query(queryText, [ messageId])
    .then((result) => {
        console.log('this is my querytext' , queryText)
        res.sendStatus(200)
    }).catch((err) => {
        console.log('server error', err)
    })
})


module.exports = router;
