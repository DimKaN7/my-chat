const intitalState = {
  page: 0,
}

const reducer = (state=intitalState, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state;
  }
}

export default reducer;