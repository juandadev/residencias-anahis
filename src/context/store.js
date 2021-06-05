import React, { createContext, useReducer } from 'react';

const initialState = {
  session: {
    isLoggedIn: false,
  },
  isOpen: false,
  modal: '',
};
const store = createContext(initialState);
const { Provider } = store;

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    options = {
      MODAL_TRIGGER: () => ({
        ...state,
        isOpen: !state.isOpen,
        modal: action.modal,
      }),
      SESSION_START: () => ({
        ...state,
        session: {
          ...action.user,
          isLoggedIn: true,
        },
      }),
      SESSION_END: () => ({
        ...state,
        session: {
          isLoggedIn: false,
        },
      }),
    };

    options[action.type]();
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, ContextProvider };
