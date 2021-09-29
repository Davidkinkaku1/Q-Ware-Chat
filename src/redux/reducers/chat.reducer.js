import { combineReducers } from 'redux';

const linkListReducer = (state = [], action) => {
    // How to handle SET_LINK
    switch (action.type) {
      case 'SET_MESSAGES':
        return action.payload;
      default:
        return state;
    }
  }; // WORKING ON GETTING NEW MESSAGES AND SETTING THE LIST

  const PostMessagesReducer = (state = [], action) => {
    if (action.type === 'ADD_MESSAGE') {
      return [...state, action.payload];
  }
  return state;

  } // WORKING ON POSTING THE MESSAGES


const deleteMessageReducer = (state = [], action) => {

    if (action.type === 'DELETE_MESSAGE') {
        // take out the object with the id that comes in on the payload
        return state.filter(message => message.id !== action.payload.id);
    }
} // end of the reducer in charge of the delete messages



const deleteChatReducer = (state = [], action) => {
    if (action.type === 'DELETE_CHAT') {
        // take out the object with the id that comes in on the payload
        return state.filter(conversation => conversation.id !== action.payload.id);
    }
} // end of the reducer in charge of the delete chat


const answerMessageReducer  = (state = [], action) => {

    if (action.type === 'CHANGE_ANSWER') {
        return action.payload;
    }
    return state;

} // end of the reducer in charge of the changing message answer

  export default combineReducers({
    linkListReducer,
    PostMessagesReducer,
    deleteMessageReducer,
    deleteChatReducer,
    answerMessageReducer
  });



  