// reducers.ts
import { LOG_OUT, USER_INFO } from './actions';

const initialState = {
 currentUser: null, // When no user is logged in
};

const userReducer = (state = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      currentUser: action.payload, // Assuming payload contains user info
    };
  case LOG_OUT:
      return {
        ...state,
        currentUser: null, // Reset currentUser to null or initial state
      };
    default:
      return state;
  }
};

export default userReducer;
