// reducers.ts
import { LINE_ITEM, LOG_OUT, USER_INFO, VIEW_LINE } from './actions';

const initialState = {
 currentUser: null, // When no user is logged in
 selctedLines:null
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
  case USER_INFO:
    return action.payload;  
  case LOG_OUT:
      return  null; 
    case VIEW_LINE:
      return {
        ...state,
        selctedLines: action.payload, 
      };
    default:
      return state;
  }
};

 

export  {userReducer};
