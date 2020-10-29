const intitalState = {
  page: 0,
  user: {
    // id: '3u79UQZxyvpxMBeKQvCz',
    id: '',
  },
  loading: false,
  chats: null,
  // [
    // {
    //   id: 'asdasdkjnjkdfvdlmkfg',
    //   companion: {
    //     userName: 'some-user',
    //     id: '3u79UQZxyvasdxMBeKQv',
    //   },
    //   messages: [
    //     {
    //       message: 'Hello!',
    //       time: 1602475200,
    //       to: '3u79UQZxyvasdxMBeKQv',
    //     },
    //     {
    //       message: 'How are you?',
    //       time: 1602475260,
    //       to: '3u79UQZxyvasdxMBeKQv',
    //     }
    //   ],
    // },
  // ],
}

const reducer = (state=intitalState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      }
    case 'SET_USER':
      return {
        ...state, 
        user: action.payload,
      } 
    case 'SET_CHATS': {
      return {
        ...state, 
        chats: action.payload,
      }
    }
    case 'SET_LOADING': {
      return {
        ...state, 
        loading: action.payload,
      }
    }
    default:
      return state;
  }
}

export default reducer;