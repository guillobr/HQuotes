const initialState = {
    quotes: [],
    users: [],
    usersCopy: [],
    userLogged: []
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

      case 'GET_USERS':
        return {
          ...state,
          users: action.payload,
          usersCopy: action.payload,
        }

    case 'POST_USER':
     
      return {
        ...state,
        userLogged: action.payload,
      }

        default:
          return state
      }
    }

    

  
  export default rootReducer