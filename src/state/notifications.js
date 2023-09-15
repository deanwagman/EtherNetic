import React, { createContext, useReducer } from 'react';
import viewTransition from '../util/viewTransitions';

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const createNotification = ({ message, duration }) => ({
  id: Date.now(),
  message,
  duration,
});

const initialState = {
  notifications: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const notification = createNotification({
        message: action.payload.message,
        duration: action.payload.duration,
      });
      return {
        ...state,
        notifications: [...state.notifications, notification],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNotification = (notification) => {
    viewTransition(() => {
      dispatch({
        type: ADD_NOTIFICATION,
        payload: notification,
      });
    });
  };

  const removeNotification = (id) => {
    viewTransition(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
        payload: id,
      });
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        ...state,
        add: addNotification,
        remove: removeNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
