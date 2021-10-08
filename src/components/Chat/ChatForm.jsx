
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

export default function ChatForm (){

    let [newMessage, setNewMessage] = useState('');

    let params = useParams();
    let { chatId } = params;
    const currentConversation = allConversations.find(
      (conversation) => conversation.url === chatId
    );
    const allMessages = useSelector((store) => store.getMessageReducer);
    // grab all the conversation that matches the url, will give the id
    const allConversations = useSelector((store) => store.linkListReducer);
  


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




    return (
        <>

<form onSubmit={addNewMessage}>
          <Container className="chat-route">
            <TextField
              fullWidth={true}
                required={true}
              label="send a message"
              id="input-fullWidth"
              value={newMessage}
              type="text"
              onChange={(event)=> setNewMessage(event.target.value)}
              align="bottom"
              style={{ display:"flex", alignItems:"flex-end", justifyContent:"center"}}
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


        </>
    )
}