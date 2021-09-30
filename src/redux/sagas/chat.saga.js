import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postMessages (action){
    // posting the created link from generator into the converstaion table
    try {
        yield axios.post('/api/chat', action.payload);
        yield put({ type: 'FETCH_MESSAGES' });
    } catch (err) {
        console.log("Error posting a message in postMessages", err);
    }
} // end of postMessage 

function* fetchMessages (action){
    console.log('SAGA gets list of message as  action: ', action);
    try {
        const setMessages = yield axios.get(`/api/chat/${action.payload}`);
        console.log('get all message for the url:', setMessages.data);
        yield put({ type: 'SET_MESSAGES', payload: setMessages.data });

    } catch {
        console.log('getting messages error on FetchMessages', err);
    }
} // end of fetchMessage


// This saga does the deleting function of each message induvidually
function* deleteMessage (action){
    console.log('the deleted message from the chat is: ', action)
    try {
        const deleteMessage = yield axios.delete(`/api/chat/${action.payload}`);
        console.log('deleting the message:', deleteMessage.data);
        yield put({ type: 'FETCH_MESSAGES' });

    } catch {
        console.log('ERROR DELETING A MESSAGE ', err);
    }

} // end of deleteMessage



// This saga does the deleting function for the chat ONLY for the speaker
function* deleteChat (action){
    console.log('the deleted chat is ', action)
    try {
        const deleteChat = yield axios.delete(`/api/chat/chat/${action.payload}`);
        console.log('deleting the CHAT:', deleteChat.data);
        yield put({ type: 'FETCH_LINKS'});

    } catch {
        console.log('ERROR DELETING A CHAT ', err);
    }

} //end of deletechat



// This saga does the update of answer and unanswer
function* answerMessage (action){
    console.log('the changed message is ', action)

    try {
        const changeAnswere = yield axios.put(`/api/chat/${action.payload}`);
        console.log('change done:', changeAnswere.data);
        yield put({ type: 'FETCH_MESSAGES'});

    } catch {
        console.log('ERROR changing Answer ', err);
    }

} // end of answerMessage



function* chatSaga (){
    yield takeLatest('FETCH_MESSAGES',fetchMessages )
    yield takeLatest('ADD_MESSAGE', postMessages)
    yield takeLatest('DELETE_MESSAGE', deleteMessage)
    yield takeLatest('DELETE_CHAT', deleteChat)
    yield takeLatest('CHANGE_ANSWER', answerMessage)
    
    }
    
    export default chatSaga;