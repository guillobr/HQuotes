import axios from 'axios'

// QUOTES
export function getQuotes() {
    return async function (dispatch) {
      var json = await axios.get('http://localhost:3001/quotes/')
      return dispatch({
        type: 'GET_QUOTES',
        payload: json.data,
      })
    }
  }

  export function postQuote(payload) {
    return async function (dispatch) {
      console.log(payload)
      const json = await axios.post(
        'http://localhost:3001/quotes/addQuote',
        payload
      )
      return dispatch({
        type: 'POST_QUOTE',
        payload: payload,
      })
    }
  }

//USER
  export function getUsers() {
    return async function (dispatch) {
      const json = await axios.get('http://localhost:3001/users/')
      return dispatch({
        type: 'GET_USERS',
        payload: json.data,
      })
    }
  }
  
  export function postUser(payload) {
    return async function (dispatch) {
      const json = await axios.post(
        'http://localhost:3001/users/addUser',
        payload
      )
      return dispatch({
        type: 'POST_USER',
        payload: json.data,
      })
    }
  }
  