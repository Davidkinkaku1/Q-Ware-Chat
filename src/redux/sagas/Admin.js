
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* AdminDelete (){
    try {
        // Dispatch MUST make sure the payload is the id of what we want to delete
        const conversationId = action.payload;
        yield axios.delete(`/api/conversation/${conversationId}`); // DELETE the url/chat
        yield put({ type: 'FETCH_ADMIN_LIST' }); // REFRESH the ADMINLIST in redux
      } catch (err) {
        console.log('Error DELETING URL', err);
      }

}

function* AdminGet (){
    // getting all the chats links for the admin with users names to it.
    try {
        const AdminGetList = yield axios.get('/api/all');
        console.log('get all user LINKS:', AdminGetList.data);
        yield put({ type: 'SET_ADMIN_LIST', payload: AdminGetList.data });

    } catch {
        console.log('getting admin LINKS error');
    }
}


function* AdminSaga (){
yield takeLatest('DELETE_URL', AdminDelete);
yield takeLatest('FETCH_ADMIN_LIST', AdminGet);
}

export default AdminSaga;