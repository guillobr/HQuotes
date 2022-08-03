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
  