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
  