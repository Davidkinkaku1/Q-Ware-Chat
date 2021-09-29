import { combineReducers } from 'redux';

const adminDeleteReducer = (state = [], action) => {
    if (action.type === 'DELETE_URL') {
        // take out the object with the id that comes in on the payload
        return state.filter(conversation => conversation.id !== action.payload.id);
    }

} // end of delete chat reducer

const adminGetReducer = (state =[], action) => {
    if (action.type === 'SET_ADMIN_LIST') {
        console.log("here is the payload for ADMINGETReducer", action.payload)
        return action.payload;
    }
    return state;
}; // end of the adminGetReducer



export default combineReducers({
    adminDeleteReducer,
    adminGetReducer,
  });