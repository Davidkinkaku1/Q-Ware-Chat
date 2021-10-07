import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  TextField,

} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
// import { withStyles } from "@material-ui/core/styles";
// import {makeStyles} from '@material-ui/core/styles'
// import { Box } from "@mui/system";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from "react-router";
import "./Chat.css";

function Chat() {
  // requiring moment
  const moment = require("moment");
  // calling in the user to show their name in the chat owner.
  const user = useSelector((store) => store.user);
  // calling in the store where messages are being store
  const allMessages = useSelector((store) => store.getMessageReducer);
  // grab all the conversation that matches the url, will give the id
  const allConversations = useSelector((store) => store.linkListReducer);

  const history = useHistory();

  const dispatch = useDispatch();
  let params = useParams();
  let { chatId } = params;
  const currentConversation = allConversations.find(
    (conversation) => conversation.url === chatId
  );
  // setting a state for my messages.
  let [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log("this is the chatId, that worries me", chatId);
    dispatch({ type: "FETCH_MESSAGES", payload: chatId });
  }, []);


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
    setNewMessage('');
  };

  const isAnswered = (id) => {
    // works to change the respond to answered
    console.log("this is my user", user);
    dispatch({
      type: "CHANGE_ANSWER",
      payload: {
        id: id,
        conversation_id: chatId,
      },
    });

  };
  const votes = (id, direction) => {
    // works to change the respond to answered
    dispatch({
      type: "VOTE_MESSAGE",
      payload: {
        id: id,
        direction: direction,
        conversation_id: chatId,
      },
    });
    console.log("this is the id in direction", id, direction);
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
      <Container align="center" className="page-conta">
        <Typography variant="h4" align="center" className="Chat-title">
          Q-ware chat
        </Typography>
        <br />
        <Container className="chat-container">
          {allMessages.map((message, i) => (
            <div key={i} className="chat-content-container" id="chat-s">
              <div className="message-container-paper"> {message.message} </div>
              <div className="time-container">
                sent {moment(`${message.sent_at}`).fromNow()}
              </div>
              <ArrowDropUpIcon onClick={() => votes(message.id, "up")} />
              {message.votes}

              {user?.id && (
                <>
                  <div
                    className="chat-container-done"
                    onClick={() => isAnswered(message.id)}
                  >
                    <DoneIcon
                      fontSize="small"
                      variant="Outlined"
                      color="success"
                      size="small"
                    />
                  </div>

                  <div className="chat-container-delete">
                    <DeleteIcon
                      fontSize="small"
                      variant="contained"
                      size="small"
                      onClick={() => deleteMessage(message.id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </Container>

                    {/* {TextField} */}
        <form onSubmit={addNewMessage}>
          <Container className="chat-route">
            <TextField
              fullWidth={true}
              required
              label="send a message"
              id="input-fullWidth"
              value={newMessage}
              type="text"
              onChange={(event)=> setNewMessage(event.target.value)}
              align="middle"
              autoFocus={true}
              variant="outlined"
              autoCorrect="string"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" component="div">
                    {newMessage.length > 0 && (
                      <Button
                        color="primary"
                        type="submit"
                        onClick={addNewMessage}
                        className="btn-send"
                      >
                        <SendIcon />
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </form>
      </Container>
    );
  }
}
export default Chat;
