import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loadingReducer from './loading';
import registerReducer, { registerSaga } from './register'
import loginReducer, { loginSaga } from './login';
import userReducer, { userSaga } from './user';
import writeReducer, { writeSaga } from './write';
import diaryReducer, { diarySaga } from './diary';
import diaryListReducer, { diaryListSaga } from './diaryList'
import subscribeReducer, { subscribeSaga } from './subscribe';
import subscribeListReducer, { subscribeListSaga } from './subscribeList';
import likeReducer, { likeSaga } from './like';
import commentReducer, { commentSaga } from './comment';
import alertReducer, { alertSaga } from './alert';
import searchReducer, { searchSaga } from './search';
import settingReducer, { settingSaga } from './setting'
import utilReducer, { utilSaga } from './util';

const rootReducer = combineReducers({
    loadingReducer,
    registerReducer,
    loginReducer,
    userReducer,
    writeReducer,
    diaryReducer,
    diaryListReducer,
    subscribeReducer,
    subscribeListReducer,
    likeReducer,
    commentReducer,
    alertReducer,
    searchReducer,
    settingReducer,
    utilReducer
});

export function* rootSaga() {
    yield all([
        registerSaga(), 
        loginSaga(), 
        userSaga(), 
        writeSaga(), 
        diarySaga(), 
        diaryListSaga(),
        subscribeSaga(),
        subscribeListSaga(),
        likeSaga(),
        commentSaga(),
        alertSaga(),
        searchSaga(),
        settingSaga(),
        utilSaga(),
    ]);
};

export default rootReducer;