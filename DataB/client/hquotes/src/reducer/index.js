const initialState = {
    quotes: []
  }


  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_QUOTES':
        return {
          ...state,
          quotes: action.payload,
        }

      case 'POST_QUOTE':
        return {
          ...state,
          quotes: [...state.quotes, action.payload],
        }

        default:
          return state
      }
    }

  
  export default rootReducer