import { GetUserResponse } from "../types";

 

export const USER_INFO = 'USER_INFO';


export const currentUser = (userInfo: GetUserResponse[]) => ({
  type: USER_INFO,
  payload: userInfo,
});
 