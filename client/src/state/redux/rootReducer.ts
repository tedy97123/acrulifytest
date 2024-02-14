// rootReducer.ts
import { combineReducers } from 'redux';
import productReducer from './reducers';

const rootReducer  = combineReducers({
  products: productReducer,
  serializableCheck:false
});

export default rootReducer;
