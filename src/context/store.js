import React, { createContext, useReducer } from 'react';

const initialState = {
  session: {},
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
        },
      }),
      SESSION_END: () => ({
        ...state,
        session: {},
      }),
    };

    options[action.type]();
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, ContextProvider };
