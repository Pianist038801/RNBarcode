// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { requestUrl } from '../Config/RequestUrl';

// our "constructor"
const create = (baseURL = requestUrl.url) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const checkPasscode = (passcode) => api.post('passcode', {passcode: passcode})
  const verifyPhoneNumber = (lang, phone_number) => api.post('', {table: 'customers', action: 'loader_phone_send', lang, phone_number})
  const logIn = (lang, phone_number, code) => api.post('', {table: "customers", action: "loader_phone_confirm", lang, phone_number, code})
  const getStoreList = (lang, token) => api.post('', {table: "stores", action: "loader_list", lang, token})
  const createProductId = (token, lang, store_id) => api.post('', {table: "common_goods", action: "loader_new_good", token, lang, store_id})
  const searchByBarcode = (token, lang, store_id, barcode) => api.post('', {table: "common_goods", action: "loader_search_barcode", token, lang, store_id, barcode})
  const uploadImage = (token, store_id, good_id, pic1, pic2) => api.post('', {table: "common_goods", action: "upload_images", token, good_id, store_id, images: [{file: pic1}, {file: pic2}]})
  const searchByName = (token, name, store_id, lang) => api.post('', {action: "etalons_search",token, table: "common_goods", name, store_id, lang})
  const getReference = (token, lang, store_id, good_id) => api.post('', {action: "loader_good_choose", table: "common_goods", token, lang, store_id, good_id})
  const getGood = (token, lang, store_id, good_id ) => 
  {
    console.log('GET_GOOD_RESPONSE=');
    console.log({action: "loader_select", table: "common_goods", token, lang, store_id, good_id})
    return api.post('', {action: "loader_select", table: "common_goods", token, lang, store_id, good_id})
  }
  const saveLeftInfo = (store_id, lang, token, good_id, price_usual, price_mode, properties) => 
  {
    console.log('SAVE_LEFT_INFO_REQUEST=');
    console.log({table: "common_goods", action: "update", store_id, lang, token, good_id, price_usual, price_mode, properties})
    return api.post('', {table: "common_goods", action: "update", store_id, lang, token, good_id, price_usual, price_mode, properties})
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    checkPasscode,
    verifyPhoneNumber,
    logIn,
    getStoreList,
    createProductId,
    searchByBarcode,
    uploadImage,
    searchByName,
    getReference,
    getGood,
    saveLeftInfo
  }
}

// let's return back our create method as the default.
export default {
  create
}
