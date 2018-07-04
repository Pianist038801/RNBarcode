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
  createProductFailure: ['error']
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

export const createProductFailure = (state, {store_id}) => {
  return state.merge({ fetching: true, store_id })
}

export const createProductSuccess = (state, {product_id}) => {
  return state.merge({ fetching: false, error: null, product_id })
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
})
