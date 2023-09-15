import React, { useEffect } from 'react';
import { styled } from 'styletron-react';
import colors from '../constants/colors';
import { colorShift } from '../util/styles';
import useNotifications from '../hooks/useNotifications';

const Container = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'absolute',
  top: '80px',
  left: '0',
  zIndex: '10',
});

const Notification = styled('li', ({ id }) => ({
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5))',
  padding: '2em 1em',
  margin: '1em',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  letterSpacing: '0.1em',
  width: '100%',
  maxWidth: '600px',
  position: 'relative',
  ...colorShift,
  viewTransitionName: `notification-${id}`,
  backdropFilter: `blur(10px)`
}));

const Close = styled('button', {
  position: 'absolute',
  top: 0,
  right: '1em',
  bottom: 0,
  background: 'transparent',
  border: 'none',
  color: colors.etherealMistWhite,
  fontFamily: '"Open Sans", sans-serif',
  letterSpacing: '0.1em',
  cursor: 'pointer',
  fontSize: '1em',
  paddingInlineStart: '1em',
});

export default () => {
  const {
    notifications,
    add: addNotification,
    remove: removeNotification,
  } = useNotifications();

  useEffect(() => {
    const { duration, id } = notifications[notifications.length - 1] || {};
    if (!duration || !id) return;

    const timeout = setTimeout(() => {
      removeNotification(id);
    }, duration);

    return () => clearTimeout(timeout);
  }, [notifications]);

  return (
    <Container>
      {notifications.map((notification, index) => (
        <Notification key={index} id={notification.id}>
          {notification.message}
          <Close onClick={() => removeNotification(notification.id)}>×</Close>
        </Notification>
      ))}
    </Container>
  );
};
