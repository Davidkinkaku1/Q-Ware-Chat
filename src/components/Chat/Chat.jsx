import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Chat() {
  // calling in the store where messages are being store
  const allMessages = useSelector((store) => store.getMessageReducer);

  const dispatch = useDispatch();

  //Initial state is an OBJECT, with keys id and name
  let [newMessage, setNewMessage] = useState({
    message: "",
    is_answered,
    sent_at,
  });

  const handleNameChange = (event) => {
    console.log("event happened");
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setNewMessage({ ...newMessage, message: event.target.value });
  };

  const addNewMessage = (event) => {
    event.preventDefault();
    //i added this
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    // GETS ALL THE MESSAGES BACK TO THE CHAT
    dispatch({ type: "FETCH_MESSAGES" });
    //updates the next MESSAGE to have a new id
    setNewMessage({ message: "", is_answered, sent_at });
    setNewMessage('');
  };
  return (
    <>
      <center>
        <h2>Q-ware</h2>
      </center>
      <div>{allMessages.map((message) => {
          return (
              {message}
          )
          })}</div>
      <div>
        <pre>{JSON.stringify(newMessage)}</pre>
        <form onSubmit={addNewMessage}>
          <input type="text" value={newMessage} onChange={handleNameChange} />
          <input type="submit" value="Add New Plant" />
        </form>
      </div>
    </>
  );
}

export default Chat;
