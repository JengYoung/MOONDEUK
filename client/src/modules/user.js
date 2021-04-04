import { createAction, handleActions } from 'redux-actions';
import createActionTypes from '../lib/createActionTypes';
import { takeLatest } from 'redux-saga/effects';
import checkAPI from '../lib/routes/auth/check';
import createSaga from '../lib/createSaga';

const CHECK = 'user/CHECK';
const [ CHECK_SUCCESS, CHECK_FAILURE ] = createActionTypes(CHECK);

export const check = createAction(CHECK, user => user);

const initialState = {
    user: '',
    checkError: null,
}

const checkSaga = createSaga(check, checkAPI);
export function* userSaga() {
    yield takeLatest(check, checkSaga());
}

const userReducer = handleActions(
    {
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            checkError: error,
        })
    },
    initialState,
);

export default userReducer;