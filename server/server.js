const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const linkRouter = require('./routes/link.router');
const adminRouter = require('./routes/admin.router');
const chatPageRouter = require('./routes/chat.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
// login
app.use('/api/user', userRouter);
// admin links and usernames 
app.use('/api/all', adminRouter);
// get all the links from a specific user from  (conversation table) by user id.
app.use('/api/link', linkRouter);
// chatpage router, where all the routes going within the chatespage happens
app.use('/api/chat', chatPageRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
