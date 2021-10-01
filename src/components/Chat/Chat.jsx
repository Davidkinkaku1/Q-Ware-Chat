import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  // calling in the store where messages are being store
  const allMessages = useSelector((store) => store.getMessageReducer);

  const dispatch = useDispatch();
  let params = useParams();
  let { chatId } = params;
  



  // setting a state for my messages.
  let [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    console.log('this is the chatId, that worries me', chatId)
    dispatch({ type: "FETCH_MESSAGES", payload:chatId});
  }, []);

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
        conversation_id:chatId
    }});
    setNewMessage('');
    //updates the next MESSAGE to have a new id
    // newMessage('');
  };

const isAnswered = (id, conversation_id) => {
// works to change the respond to answered
    dispatch({ type: "CHANGE_ANSWER", payload:{
      id:id,
      conversation_id:conversation_id
    }})
}

const deleteMessage = (id, conversation_id) => {
// deletes each indivudual messages 
    dispatch({ type: "DELETE_MESSAGE", payload:{
      id:id,
      conversation_id:conversation_id
    }})
}


if (!chatId){
  return <h2>You have an invalid link or Qr- Code</h2>
} else {

  return (
    <>
      <center>
        <h2>Q-ware</h2>
      </center>
      <div>
          { allMessages.map((message, i) => <div key={i}>
              {message.message} 
              <button onClick={() =>isAnswered(message.id, message.conversation_id)}>Answered</button>
              <button onClick={() =>deleteMessage(message.id, message.conversation_id)}>delete</button>
              </div>) }</div>
      <div>

        <form onSubmit={addNewMessage}>
          <input type="text" value={newMessage.message} onChange={handleNewMessage} />
          <input type="submit" value="send message" />
        </form>
      </div>
    </>
  );
}
}
export default Chat;
