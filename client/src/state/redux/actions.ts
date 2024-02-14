import { Products } from "../types";

 

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const VIEW_PRODUCT = 'VIEW_PRODUCT';


export const editProduct = (product: Products[]) => ({
  type: EDIT_PRODUCT,
  payload: product,
});
 
export const viewProduct = (product:Products[]) => ({
  type: VIEW_PRODUCT,
  payload: product,
});