// reducers.ts
import { LINE_ITEM, LOG_OUT, USER_INFO, VIEW_LINE } from './actions';

const initialState = {
 currentUser: null, // When no user is logged in
 selctedLines:null
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
  case USER_INFO:
    return action.payload; // Assuming payload contains user info
  case LOG_OUT:
      return  null; 
    case VIEW_LINE:
      return {
        ...state,
        selctedLines: action.payload, // Consider if you want to merge or replace existing products.
      };
    default:
      return state;
  }
};

 

export  {userReducer};
