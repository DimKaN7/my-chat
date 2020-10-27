const intitalState = {
  page: 0,
  user: {
    // id: '3u79UQZxyvpxMBeKQvCz',
  },
  chats: [
    /*
    {
      companion: 'Some User',
      messages: [
        {
          message: 'Hello!',
          time: 1602475200,
        },
        {
          message: 'How are you?',
          time: 1602475260,
        }
      ],
    },
    {
      companion: 'Another User',
      messages: [
        {
          message: 'Wazap!',
          time: 1602554340,
        },
      ],
    },
    */
  ],
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
    default:
      return state;
  }
}

export default reducer;