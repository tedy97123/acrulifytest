// rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './reducers';

const rootReducer  = combineReducers({
  products: userReducer,
  serializableCheck:false
});

export default rootReducer;
