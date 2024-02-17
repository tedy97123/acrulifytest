import {   currentUser, lineItems } from "../types";


export const USER_INFO = 'USER_INFO';
export const LOG_OUT = 'LOG_OUT'
export const LINE_ITEM = 'LINE_ITEM'
export const VIEW_LINE = 'VIEW_LINE'
 
export const loggedInUser = (currentUser: currentUser[]) => ({
  type: USER_INFO,
  payload: currentUser,
});
export const logout = ( ) => ({
  type: LOG_OUT,
}); 

export const viewProduct = (lineItems: lineItems[]) => ({
  type: VIEW_LINE,
  payload: lineItems,
});