import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Chat() {
  // calling in the store where messages are being store
  const allMessages = useSelector((store) => store.getMessageReducer);

  const dispatch = useDispatch();

  // setting a state for my messages.
  let [newMessage, setNewMessage] = useState('');


  const handleNewMessage = (event) => {
    console.log("event happened");
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setNewMessage(event.target.value);
  };

  const addNewMessage = (event) => {
    event.preventDefault();

    //i added this
    dispatch({ type: "ADD_MESSAGE", payload: {
        message: newMessage,
        is_answered: false,
        conversation_id:20
    }});
    
    setNewMessage('');
    //updates the next MESSAGE to have a new id
    // newMessage('');
  };

const isAnswered = (event) => {
    event.preventDefault();
    dispatch({ type: "CHANGE_ANSWER", payload: id})
}

  return (
    <>
      <center>
        <h2>Q-ware</h2>
      </center>
      <div>
          { allMessages.map((message) => <li>{message.message} </li>) }</div>
      <div>

        <form onSubmit={addNewMessage}>
          <input type="text" value={newMessage.message} onChange={handleNewMessage} />
          <input type="submit" value="send message" />
        </form>
      </div>
    </>
  );
}

export default Chat;
