import { combineReducers } from 'redux';
import security from './security';
import ui from './ui';

const rootRuducers = combineReducers({
  security,
  ui
});

export default rootRuducers;
