import fetch from 'isomorphic-fetch'
import { checkStatus, parseJSON } from '../fetch.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const loginRequest = () => ({ 
    type: LOGIN_REQUEST
})

const loginSuccess = () => ({ 
    type: LOGIN_SUCCESS
})

const loginFailure = () => ({
  type: LOGIN_FAILURE
})

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export function logout (username, password) {
  return function (dispatch) {
    localStorage.removeItem('token')
    return dispatch(logoutSuccess())
  }
}

export function login (username, password) {
  return function (dispatch) {

    dispatch(loginRequest())

    return new Promise((resolve, reject) => {
      fetch('/api-token-auth/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
          localStorage.setItem('token', json.token)
          dispatch(loginSuccess())
          resolve({ username, password })
        })
        .catch(error => {
          dispatch(loginFailure())
          parseJSON(error.response).then(json => {reject({ ...json, _error: json.non_field_errors })})
        })
    })
  }
}