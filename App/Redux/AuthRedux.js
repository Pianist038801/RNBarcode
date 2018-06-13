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

// successful verify number
export const loginSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, token: action.token })
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
})
