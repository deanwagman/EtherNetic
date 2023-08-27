const FULL = 100;

// Hunger reducer
export default function hungerReducer(state = FULL, action) {
  switch (action.type) {
    case 'feed':
      return state + action.payload;
    default:
      return state;
  }
}

// Slowly decrease hunger over time. This is a side effect!
export function monitorHunger() {
  return (dispatch) => {
    setInterval(() => {
      dispatch({ type: 'feed', payload: -1 });
    }, 5000);
  };
}

// If hunger is 0, the pet dies. This is a side effect!
export function checkHunger() {
  return (dispatch, getState) => {
    setInterval(() => {
      const hunger = getState().hunger;
      if (hunger <= 0) {
        dispatch({ type: 'die' });
      }
    }, 1000);
  };
}

// Feed the pet
export function feed(amount) {
  return { type: 'feed', payload: amount };
}
