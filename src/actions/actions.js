export const setPage = (page) => {
  return {
    type: 'SET_PAGE',
    payload: page,
  }
}

export const setChats = (chats) => {
  return {
    type: 'SET_CHATS',
    payload: chats,
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const setLoading = (loading) => {
  return {
    type: 'SET_LOADING',
    payload: loading,
  }
}