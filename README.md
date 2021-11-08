# Q-Ware Chat

## Description 

Duration: 2 weeks sprint

Q-Ware chat is a response to the undying desires of helping event hosters or orators that want to collect written questions from their audience or attendees. The Q-Ware chat is a space that allows everyone to speak out their true mind, without having to deal with the judgment they may suffer, within the platform everyone is anonymous. Generally speaking, this is much or more a chat room that can be created by one and entered by as many attendees as have the link or QR-code. This application is also responsive, to any mobile phone.

## Host view
The only person that can actually login is the one trying to create a chat room, login in is not required for attendes.

![Screen Shot 2021-11-07 at 6 02 53 PM](https://user-images.githubusercontent.com/82859114/140668774-4270ed0f-3890-4b84-a59b-a50efb101377.png)

## Host View inside the chat
<img width="1081" alt="Screen Shot 2021-11-07 at 5 59 59 PM" src="https://user-images.githubusercontent.com/82859114/140668886-2f07cf27-5fbe-4e23-aa25-4473b86ae8b5.png">

## Attende(s) View
<img width="1093" alt="Screen Shot 2021-11-07 at 6 00 18 PM" src="https://user-images.githubusercontent.com/82859114/140668925-920853c1-7ddb-4c85-bd75-43541ce1b062.png">


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

1. If you would like to name your database something else, you will need to change `untitled_table` to the name of your new database name in `server/modules/pool.js`
2. The queries in the database.sql file are set up to create all the necessary tables. The project is built on Postgres, so you will need to make sure to have that installed. Use your client of choice to run the queries.

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtERB9Bb687797878978798h` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App


## Build With 
- Express
- React
- Postgresql
- Heroku
-JavaScript
- Node.js
- Axios
- Express
- Passport 
- HTML5
- Postman
- CSS
- Material UI
- AWS for files storage

## Acknoledgement 
Thanks to Emerging Digital Academy who equipped and helped me with the skills that I need to make this application a reality. I took their 20 week fullstack bootcamp and this is a direct result of the knowledge I gained with zero starting knowledge about computer programming. 

## Support 
If you have any questions or issues, please email me davidkinkaku1@gmail.com

## Thanks
Thank you for reading along, have an amazing day!
