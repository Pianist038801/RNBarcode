import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authRequest: ['passcode'],
  authSuccess: ['passcode'],
  authFailure: ['error'],
  setLang: ['lang'],
  verifyRequest: ['lang', 'phone_number'],
  verifyFailure: ['error'],
  verifySuccess: [],
  loginRequest: ['lang', 'phone_number', 'code'],
  loginFailure: ['error'],
  loginSuccess: ['token'],
  storeRequest: ['lang', 'token'], 
  storeFailure: ['error'],
  storeSuccess: ['name', 'stores'],
  createProductRequest: ['store_id'],
  createProductSuccess: ['product_id'],
  createProductFailure: ['error'],
  searchBarcodeRequest: ['barcode'],
  searchBarcodeSuccess: ['id', 'is_etalon'],
  searchBarcodeFailure: ['error'],
  uploadImageRequest: ['good_id', 'pic1', 'pic2'],
  uploadImageSuccess: ['images'],
  uploadImageFailure: ['error'],
  getGoodRequest: ['good_id'],
  getGoodSuccess: ['good_info'],
  searchNameRequest: ['name'],
  searchNameSuccess: ['goods'],
  getReferenceRequest: ['good_id'],
  saveLeftinfoRequest: ['price_usual', 'price_mode', 'properties'],
  saveLeftinfoSuccess: ['data'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  passcode: null,
  fetching: null,
  error: null,
  lang: 'ru',
  phone_number: '',
  code: '',
  token: null,
  name: '',
  stores: [],
  store_id: null,
  product_id: null,
  id: null,
  is_etalon: null,
  images: null,
  good_info: null,
  goods:null,
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  isLoggedIn: state => {
    return state.passcode != null ? true : false;
  }
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { passcode }) =>
  state.merge({ fetching: true, passcode })

// successful avatar lookup
export const success = (state, action) => {
  const { passcode } = action
  return state.merge({ fetching: false, error: null, passcode })
}

// failed to get the avatar
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error: error, passcode: null })

// change language option
export const setLang = (state, action) => {
  return state.merge({ lang: action.lang })
}

export const verifyRequest = (state, { lang, phone_number }) =>
  state.merge({ fetching: true, lang, phone_number })

// successful verify number
export const verifySuccess = (state, action) => {
  return state.merge({ fetching: false, error: null })
}

export const loginRequest = (state, { lang, phone_number, code }) =>
  state.merge({ fetching: true, lang, code, phone_number })

// successful login number
export const loginSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, token: action.token })
}

export const storeRequest = (state, { lang, token }) =>
  state.merge({ fetching: true, lang, token })

export const storeSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, name: action.name, stores: action.stores })
}

export const createProductRequest = (state, {store_id}) => {
  return state.merge({ fetching: true, store_id })
}

export const createProductSuccess = (state, {product_id}) => {
  return state.merge({ fetching: false, error: null, product_id })
}

export const searchBarcodeRequest = (state, {barcode}) => {
  return state.merge({ fetching: true, barcode })
}
 
export const searchBarcodeSuccess = (state, {id, is_etalon}) => {
  return state.merge({ fetching: false, error: null, id, is_etalon })
}

export const uploadImageRequest = (state, {good_id, pic1, pic2}) => {
  return state.merge({ fetching: true}) 
}

export const uploadImageSuccess = (state, {images}) => {
  return state.merge({ fetching: false, images })
}

export const getGoodRequest = (state, {good_id}) => {
  return state.merge({ fetching: true })
}

export const getGoodSuccess = (state, {good_info}) => {
  return state.merge({ fetching: false, good_info })
}

export const searchNameRequest = (state, {name}) => {
  return state.merge({ fetching: true })
}

export const searchNameSuccess = (state, {goods}) => {
  return state.merge({ fetching: false, goods })
}

export const getReferenceRequest = (state, {good_id}) => {
  return state.merge({ fetching: true })
}

export const saveLeftinfoRequest = (state, action) => {
  return state.merge({ fetching: true })
}

export const saveLeftinfoSuccess = (state, action) => {
  return state.merge({ fetching: false  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.SET_LANG]: setLang,
  [Types.VERIFY_REQUEST]: verifyRequest,
  [Types.VERIFY_FAILURE]: failure,
  [Types.VERIFY_SUCCESS]: verifySuccess,
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.STORE_SUCCESS]: storeSuccess,
  [Types.STORE_REQUEST]: storeRequest,
  [Types.CREATE_PRODUCT_REQUEST]: createProductRequest,
  [Types.CREATE_PRODUCT_FAILURE]: failure,
  [Types.CREATE_PRODUCT_SUCCESS]: createProductSuccess,
  [Types.SEARCH_BARCODE_REQUEST]: searchBarcodeRequest,
  [Types.SEARCH_BARCODE_FAILURE]: failure,
  [Types.SEARCH_BARCODE_SUCCESS]: searchBarcodeSuccess,
  [Types.UPLOAD_IMAGE_REQUEST]: uploadImageRequest,
  [Types.UPLOAD_IMAGE_FAILURE]: failure,
  [Types.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  [Types.GET_GOOD_REQUEST]: getGoodRequest,
  [Types.GET_GOOD_SUCCESS]: getGoodSuccess,
  [Types.SEARCH_NAME_REQUEST]: searchNameRequest,
  [Types.SEARCH_NAME_SUCCESS]: searchNameSuccess,
  [Types.GET_REFERENCE_REQUEST]: getReferenceRequest,
  [Types.SAVE_LEFTINFO_REQUEST]: saveLeftinfoRequest
})
