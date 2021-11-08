import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Container, TextField } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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
  let [newMessage, setNewMessage] = useState("");
  const [clickCount, setClickCount] = useState(0)
  const [userName, setUserName] = useState('')



  useEffect(() => {
    console.log("this is the chatId, that worries me", chatId);
    dispatch({ type: "FETCH_MESSAGES", payload: chatId });

    const interval = setInterval(() => {

      dispatch({ type: "FETCH_MESSAGES", payload: chatId });
        console.log('This will run every second!');
      }, 1000);
      return () => clearInterval(interval);
    
  }, []);


  useEffect(() => {

   const objDiv = document.getElementById("chat-container");
   objDiv.scrollTop = objDiv.scrollHeight;
  //  debugger;
  },[allMessages])



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
    setNewMessage("");
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
      <Container align="center" className="page-container">
        <Typography variant="h4" align="center" className="Chat-title">
          <img alt="logo" src={"../favicon.ico"} class="image-icon" /> Q-ware
          chat
        </Typography>
        <br />
        <Container className="chat-container" id="chat-container">
          {allMessages.map((message, i) => (

            <table key={i} className="chat-content-container" id="chat-s">
              
              <tr className={message.is_answered=== true ? "answer-true": ""}>
                <td width="3%">
                  <ArrowDropUpIcon onClick={() => votes(message.id, "up")} />
                <td className="chat-item-vote"> {message.votes}</td> 
                </td>
                <td className="message-container-paper">
                  {" "}
                  {message.message}{" "}
                <td className="message-time-container">
                  sent {moment(`${message.sent_at}`).fromNow()}
                </td>
                </td>
                {user?.id && (
                  <> 
                    <td width="5%"
                      className="chat-container-done"
                      onClick={() => isAnswered(message.id)}
                    >
                    <td>
                      <DoneIcon
                        fontSize="small"
                        variant="Outlined"
                        color="success"
                        size="small"
                      />
                    <td className="message-container-delete">
                      <DeleteIcon
                        fontSize="small"
                        variant="contained"
                        size="small"
                        onClick={() => deleteMessage(message.id)}
                      />
                    </td>
                    </td>

                    </td>

                  </>
                )}
              </tr>
            </table>
          ))}
        </Container>

        {/* {TextField} */}
        <form onSubmit={addNewMessage}>
          <Container className="chat-route">
            <TextField
              fullWidth={true}
              required={true}
              label="send a message"
              id="input-fullWidth"
              value={newMessage}
              type="text"
              onChange={(event) => setNewMessage(event.target.value)}
              align="bottom"
              style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                backgroundColor: "white"
                // display: "flex", 
               // alignItems: "flex-end",
               // justifyContent: "center",
              }}
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
                /* startAdornment: (
                  <InputAdornment position="start" component="div">
                  <Button
                        color="primary"
                        type="submit"
                        onClick={disableTextField} // handle the disable the chat
                        className="btn-send"
                      >
                      
                      </Button>
                  </InputAdornment>
                ) */
              }}
            />
          </Container>
        </form>
      </Container>
    );
  }
}
export default Chat;
