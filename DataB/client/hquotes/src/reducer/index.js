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

        default:
          return state
      }
    }
  
  export default rootReducer