import React, { createContext, useReducer } from 'react';

const initialState = {
  session: {
    isLoggedIn: false,
  },
  isOpen: false,
  modal: '',
  selected: [],
};
const store = createContext(initialState);
const { Provider } = store;

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SESSION_START':
        return {
          ...state,
          session: {
            id: action.user.id,
            name: action.user.name,
            email: action.user.email,
            level: action.user.level,
            isLoggedIn: true,
          },
        };

      case 'SESSION_END':
        return {
          ...state,
          session: {
            isLoggedIn: false,
          },
        };

      case 'SET_SELECTED':
        return {
          ...state,
          selected: action.selected,
        };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, ContextProvider };
