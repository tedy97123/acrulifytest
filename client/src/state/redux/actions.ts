import { currentUser } from "../types";


export const USER_INFO = 'USER_INFO';
export const LOG_OUT = 'LOG_OUT'

export const loggedInUser = (currentUser: currentUser[]) => ({
  type: USER_INFO,
  payload: currentUser,
});
export const logout = ( ) => ({
  type: LOG_OUT,
});
 
 