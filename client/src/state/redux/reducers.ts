// reducers.ts
import { USER_INFO } from './actions';

const initialState = {
  user: [], // Initialize products as an empty array or with any default values you need.
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_INFO:
      return {
        products: [...state.user, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
