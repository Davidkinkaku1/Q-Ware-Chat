
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Addmin is deleting the url
function* adminDelete (){
    try {
        // Dispatch MUST make sure the payload is the id of what we want to delete
        const conversationId = action.payload;
        yield axios.delete(`/api/all${conversationId}`); // DELETE the url/chat
        yield put({ type: 'FETCH_ADMIN_LIST' }); // REFRESH the ADMINLIST in redux
      } catch (err) {
        console.log('Error DELETING URL', err);
      }

}

// Admin is getting 
function* adminGet (){
    // getting all the chats links for the admin with users names to it.
    try {
        const adminGetList = yield axios.get('/api/all');
        console.log('get all user LINKS:', adminGetList.data);
        yield put({ type: 'SET_ADMIN_LIST', payload: adminGetList.data });

    } catch {
        console.log('getting admin LINKS error');
    }
}

function* AdminSaga (){
yield takeLatest('DELETE_URL', adminDelete);
yield takeLatest('FETCH_ADMIN_LIST', adminGet);
}

export default AdminSaga;