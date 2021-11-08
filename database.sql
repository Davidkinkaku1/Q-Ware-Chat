CREATE TABLE "user" (
	"id" serial PRIMARY KEY ,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE
	
);
CREATE TABLE "conversation" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(8000) NOT NULL,
	"user_id" INT NOT NULL REFERENCES "user",
	"created_at" DATE DEFAULT NOW()
	
);
CREATE TABLE "message" (
	"id" serial PRIMARY KEY,
	"name" varchar(150) DEFAULT 'anonymous',
	"message" varchar(8000) NOT NULL UNIQUE,
	"is_answered" BOOLEAN DEFAULT FALSE,
	"sent_at" TIMESTAMP DEFAULT NOW(),
	"votes" INT NOT NULL DEFAULT 0,
	"conversation_id" INT NOT NULL REFERENCES "conversation" ON DELETE CASCADE

);

UPDATE "message" SET "votes" = "votes" +1
WHERE "id" =72;





-- DELETING TABLES 
--DROP TABLE "message";
--DROP TABLE "conversation";
--drop table "user";


-- SEEING ALL IN TABLES
--SELECT * FROM "user";
--SELECT * FROM "conversation";
--	SELECT * FROM "message" where "conversation_id" =74
--;


-- 1. DISPLAY ALL THE CREATED CHATS(LINKS) QUERY FOR PAGE 1. 

--	SELECT * FROM "conversation" where "user_id" ="req.user.id" order by "id";

-- 2. DELETING THE CHAT OR THE LINK FROM A ADMIN PERSPECTIVE ON CLOSE CHAT, this drops the whole c
--	DELETE FROM "conversation" WHERE "id"= $1;

-- 3. Deleting Messages sent to the chat:
--    DELETE FROM "message" WHERE "id"= $1;      
                                                                                                                                                                                                                                               
-- 4. changing the not answered to answered SET ANSER
--	UPDATE "message" SET is_answered = NOT is_answered
--	WHERE "id" =$1;

-- 5. ADDING THE MESSAGES FROM THE ATTENDEES TO THE DATABASE
--	  INSERT INTO "message" ("message", "is_answered", "sent_at")
--	  VALUE ($1, $2, $3) RETURNING *;

-- 6. admin page query for all urls created
	
--	SELECT "user"."id", "user"."username", "conversation"."url" FROM "user"
--	JOIN "conversation" ON "conversation"."user_id" = "user"."id"
--	ORDER BY "id";

-- INSERT A MESSAGE INTO MESSAGE TABLE

--INSERT INTO "message" ( "message", "conversation_id")
--VALUES ('come to the fou  ' , 15) ;
--
--INSERT INTO "conversation" ( "url", "user_id", "created_at")
--VALUES ('https://docs.google.com/document', 3, '2021-09-10');
--
--SELECT "conversation"."id", "conversation"."url", jsonb_agg (message) as "message" FROM "conversation"
--JOIN "message" ON "message"."conversation_id" ="conversation"."id" 
--GROUP BY "conversation"."id";


-- DELETING A URL AND ALL IT'S MESSAGES.
--DELETE FROM "conversation" WHERE "user_id"=3;


-- Getting the messages to the chat with a get request
--SELECT * FROM "message"
--WHERE "conversation_id" = (SELECT "id" from "conversation" where "url" ='david72')
--ORDER BY "id";
--
--SELECT * FROM "message"
--WHERE "conversation_id" = (SELECT "id" from "conversation" where "url" =$1)
--ORDER BY "id";
--
--INSERT INTO "message" ( "message", "conversation_id")
--  VALUES($1, (SELECT "id"="conversation"."id"));
--

-- Show each user and their url 
--SELECT "user"."username", "conversation"."url", jsonb__agg(message) "message"."message"

-- DELETE MESSAGE IN 

