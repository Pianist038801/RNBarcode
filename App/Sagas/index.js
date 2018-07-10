import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { AuthTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */


import { checkPasscode,
  verifyPhoneNumber,
  logIn,
  getStoreList,
  createEmptyProduct,
  searchBarcode,
  searchByName,
  getReference,
  getGood,
  saveLeftInfoRequest
} from './AuthSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(AuthTypes.AUTH_REQUEST, checkPasscode, api),
    takeLatest(AuthTypes.VERIFY_REQUEST, verifyPhoneNumber, api),
    takeLatest(AuthTypes.LOGIN_REQUEST, logIn, api),
    takeLatest(AuthTypes.STORE_REQUEST, getStoreList, api),
    takeLatest(AuthTypes.CREATE_PRODUCT_REQUEST, createEmptyProduct, api),
    takeLatest(AuthTypes.SEARCH_BARCODE_REQUEST, searchBarcode, api),
    takeLatest(AuthTypes.SEARCH_NAME_REQUEST, searchByName, api),
    takeLatest(AuthTypes.GET_REFERENCE_REQUEST, getReference, api),
    takeLatest(AuthTypes.GET_GOOD_REQUEST, getGood, api),
    takeLatest(AuthTypes.SAVE_LEFTINFO_REQUEST, saveLeftInfoRequest, api)
  ])  
}
