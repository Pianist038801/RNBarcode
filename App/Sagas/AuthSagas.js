import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'

export function * checkPasscode (api, action) {
  const { passcode } = action
  // make the call to the api
  const response = yield call(api.checkPasscode, passcode)
  if (response.status === 200 && response.data.status) {
    // do data conversion here if needed
    AsyncStorage.setItem('@irate-passcode', passcode);
    yield put(AuthActions.authSuccess(passcode))
  } else {
    switch(response.problem){
      case 'NETWORK_ERROR':
        yield put(AuthActions.authFailure("Network Connection is not available"));
        break;
      case 'CONNECTION_ERROR':
        yield put(AuthActions.authFailure("Server is not available"));
        break;
      default:
        yield put(AuthActions.authFailure(response.data.message));
        break;
    }
  }
}

export function * verifyPhoneNumber (api, action) {
  const { lang, phone_number } = action
  console.log('Action=', action);
  // make the call to the api
  const response = yield call(api.verifyPhoneNumber, lang, phone_number)
  console.log('Response=', response);
  if (response.status === 200 && response.data.result === 'done') {
    // do data conversion here if needed
    
    yield put(AuthActions.verifySuccess())
  } 
  else
  {
    if (response.status === 200 && response.data.result === 'error') {
      yield put(AuthActions.verifyFailure(response.data.errors.phone_number))
    }
    else{
      yield put(AuthActions.verifyFailure('Error occured while connecting to server'))
    }
  }
}

export function * logIn (api, action) {
  const { lang, code, phone_number } = action
  console.log('Action=', action);
  // make the call to the api
  const response = yield call(api.logIn, lang, phone_number, code)
  console.log('Response=', response);
  if (response.status === 200 && response.data.result === 'done') {
    // do data conversion here if needed
    
    yield put(AuthActions.loginSuccess())
  } 
  else
  {
    if (response.status === 200 && response.data.result === 'error') {
      yield put(AuthActions.verifyFailure(response.data.errors.code))
    }
    else{
      yield put(AuthActions.verifyFailure('Error occured while connecting to server'))
    }
  }
}


