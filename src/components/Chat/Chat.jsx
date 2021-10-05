import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, SendIcon, Container, FormControl,TextField } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";


function Chat() {
  // requiring moment
  const moment = require("moment");
  // calling in the user to show their name in the chat owner.
  const user = useSelector((store) => store.users);
  // calling in the store where messages are being store
  const allMessages = useSelector((store) => store.getMessageReducer);
  // grab all the conversation that matches the url, will give the id
  const allConversations = useSelector((store) => store.linkListReducer);

  const dispatch = useDispatch();
  let params = useParams();
  let { chatId } = params;
  const currentConversation = allConversations.find(
    (conversation) => conversation.url === chatId
  );
  // setting a state for my messages.
  let [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log("this is the chatId, that worries me", chatId);
    dispatch({ type: "FETCH_MESSAGES", payload: chatId });
  }, []);

  const handleNewMessage = (event) => {
    console.log("event happened");
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setNewMessage(event.target.value);
  };

  const addNewMessage = (event) => {
    event.preventDefault();

    //i added this
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        message: newMessage,
        is_answered: false,
        conversation_id: chatId,
      },
    });
  };

  const isAnswered = (id) => {
    // works to change the respond to answered
    dispatch({
      type: "CHANGE_ANSWER",
      payload: {
        id: id,
        conversation_id: chatId,
      },
    });
  };

  const deleteMessage = (id) => {
    // deletes each indivudual messages
    dispatch({
      type: "DELETE_MESSAGE",
      payload: {
        id: id,
        conversation_id: chatId,
      },
    });
  };

  if (!chatId) {
    return (
      <Typography variant="h2" color="primary" align="center">
        You have an invalid link or Qr- Code
      </Typography>
    );
  } else {
    return (
      <Container  align="center">
        <Typography variant="h4" color="primary" align="center">
          Q-ware chat
        </Typography>

        <Container className="chat-container">
          {allMessages.map((message, i) => (
            <Container key={i}>
              {message.message} sent {moment(`${message.sent_at}`).fromNow()}
              <Container className="chat-container-answer-delete">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => isAnswered(message.id)}
                >
                  <DoneIcon fontSize="small" variant="Outlined"
                  color="success"/>
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteMessage(message.id)}
                >
                  <DeleteIcon fontSize="small" variant="contained"/>
                </Button>
              </Container>
            </Container>
          ))}
        </Container>
        <Container className="chat-route">
          <FormControl onSubmit={addNewMessage} >
            {/* <Input
              type="text"
              value={newMessage.message}
              onChange={handleNewMessage}

            /> */}
            <TextField 
            fullWidth label="send a message" 
            id="input-fullWidth" 
            value={newMessage.message}
            type="text"
            onChange={handleNewMessage}
            align="center"
            />
            <Button color="primary" type="submit">
              <SendIcon />
            </Button>
          </FormControl>
        </Container>
      </Container>
    );
  }
}
export default Chat;
