// rootReducer.ts
import { combineReducers } from 'redux';
import {userReducer} from './reducers';

const rootReducer  = combineReducers({
  currentUser: userReducer,
  serializableCheck:false
});

export default rootReducer;
