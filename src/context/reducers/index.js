const reducer = (state, action) => {
  switch (action.type) {
    case 'SESSION_START':
      return {
        ...state,
        session: {
          ...action.payload,
          isLoggedIn: true,
        },
      };

    case 'SESSION_END':
      return {
        ...state,
        session: {
          isLoggedIn: true,
        },
      };

    default:
      return state;
  }
};

export default reducer;
