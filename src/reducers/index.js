import { combineReducers } from 'redux';
import musicianReducer from './musicianReducer';

const rootReducer = combineReducers({
  musicianReducer,
});

export default rootReducer;
