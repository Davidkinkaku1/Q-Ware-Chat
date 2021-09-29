import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* userLinkPost (action){
    // posting the created link from generator into the converstaion table
    try {
        yield axios.post('/api/link', action.payload);
        yield put({ type: 'FETCH_LINKS' });
    } catch (err) {
        console.log("Error FETCHING LINKS for USER post", err);
    }
}
function* userLinkGet (action){
    console.log('SAGA gets list of links as  action: ', action);
    try {
        const UserLinks = yield axios.get('/api/link');
        console.log('get all user LINKS:', UserLinks.data);
        yield put({ type: 'SET_LINKS', payload: UserLinks.data });

    } catch {
        console.log('getting for user LINKS error');
    }
}

function* userSaga (){
    yield takeLatest('ADD_LINK', userLinkPost)
    yield takeLatest('FETCH_LINKS', userLinkGet)
    
    }
    
    export default userSaga;