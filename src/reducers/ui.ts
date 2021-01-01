const defaultState = {
  collapsed: false
};

const ui = (state = defaultState, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'SET_COLLAPSED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ui;
