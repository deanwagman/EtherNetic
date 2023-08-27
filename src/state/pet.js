export const reducer = (state, action) => {
  switch (action.type) {
    case 'FEED':
      return { ...state, hunger: state.hunger - 10 };
    case 'PLAY':
      return { ...state, happiness: state.happiness + 1 };
    case 'SLEEP':
      return { ...state, sleeping: !state.sleeping };
    case 'TICK':
      return {
        ...state,
        hunger: state.hunger + 1,
        happiness: state.happiness - 1,
        energy: state.sleeping ? state.energy + 1 : state.energy - 1,
      };
    case 'DIE':
      return {
        ...state,
        dead: true,

        hunger: 0,
        happiness: 0,
        health: 0,
        energy: 0,
      };
    default:
      return state;
  }
};

export const initialState = {
  hunger: 50,
  happiness: 50,
  health: 100,
  energy: 50,
  sleeping: false,
  dead: false,
};
