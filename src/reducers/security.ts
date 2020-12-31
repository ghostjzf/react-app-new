const defaultState = {
  currentUser: '',
  isLogin: false
};

const security = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    default:
      return state;
  }
};

export default security;
