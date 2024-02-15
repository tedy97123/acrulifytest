import { GetUserResponse } from "../types";

 

export const USER_INFO = 'USER_INFO';


export const user = (userInfo: GetUserResponse[]) => ({
  type: USER_INFO,
  payload: userInfo,
});
 