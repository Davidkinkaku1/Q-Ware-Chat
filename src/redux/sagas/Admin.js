
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* AdminPost (){
    try {
        yield axios.post('/api/all', action.payload);
        yield put({ type: '' });
    } catch (err) {
        console.log("Error FETCHING LINKS for USER post", err);
    }

}

function* AdminGet (){
    try {
        const AdminGetList = yield axios.get('/api/all');
        console.log('get all user LINKS:', AdminGetList.data);
        yield put({ type: '', payload: AdminGetList.data });

    } catch {
        console.log('getting admin LINKS error');
    }
}


function* AdminSaga (){
yield takeLatest('', AdminPost)
yield takeLatest('', AdminGet)

}

export default AdminSaga;