export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_Username':
      return { ...state, username: action.payload };
    case 'SET_Email':
      return { ...state, email: action.payload };
    case 'SET_Password':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  username: '',
  email: '',
  password: '',
};
