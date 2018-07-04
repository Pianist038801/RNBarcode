import { call, put, select } from 'redux-saga/effects'
import { path } from 'ramda'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'
//import { store } from '../Redux/CreateStore';
import store from '../Redux';
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
    console.log('VerifySuccess');
    yield put(AuthActions.verifySuccess())
  } 
  else
  {
    console.log('VerifyFailure');
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
    yield put(AuthActions.loginSuccess(response.data.token))
  }
  else
  {
    if (response.status === 200 && response.data.result === 'error') {
      yield put(AuthActions.loginFailure(response.data.errors.code))
    }
    else{
      yield put(AuthActions.loginFailure('Error occured while connecting to server'))
    }
  }
}

export function * getStoreList (api, action) {
  const { lang, token } = action
  console.log('Action=', action);
  // make the call to the api
  const response = yield call(api.getStoreList, lang, token)
  console.log('Response=', response);
  if (response.status === 200 && response.data.result === 'done') {
    // do data conversion here if needed
    yield put(AuthActions.storeSuccess(response.data.name, response.data.stores))
  }
  else
  {
    if (response.status === 200 && response.data.result === 'error') {
      yield put(AuthActions.storeFailure(response.data.report))
    }
    else{
      yield put(AuthActions.storeFailure('Error occured while connecting to server'))
    }
  }
}

export function * createEmptyProduct (api, action) {
  const { store_id } = action
  console.log('Store_Id=', store_id);
  const getToken = (state) => state.auth.token
  const getLang = (state) => state.auth.lang

  const token = yield select(getToken)
  const lang = yield select(getLang)

  const response = yield call(api.createProductId, token, lang, store_id)
  console.log('Response=', response);
  if (response.status === 200 && response.data.result === 'done') {
    // do data conversion here if needed
    yield put(AuthActions.createProductSuccess(response.data.id))
  }
  else
  {
    if (response.status === 200 && response.data.result === 'error') {
      yield put(AuthActions.createProductFailure(response.data.report))
    }
    else{
      yield put(AuthActions.storeFailure('Error occured while connecting to server'))
    }
  }
}
