import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* UserLinkPost (){
    try {
        yield axios.post('/api/links', action.payload);
        yield put({ type: 'FETCH_LINKS' });
    } catch (err) {
        console.log("Error FETCHING LINKS for USER post", err);
    }
}
function* UserLinkGet (){
    try {
        const UserLinks = yield axios.get('/api/links');
        console.log('get all user LINKS:', UserLinks.data);
        yield put({ type: 'SET_LINKS', payload: UserLinks.data });

    } catch {
        console.log('get LINKS error');
    }
}

function* UserSaga (){
    yield takeLatest('FETCH_LINK', UserLinkPost)
    yield takeLatest('SET_LINKS', UserLinkGet)
    
    }
    
    export default UserSaga;