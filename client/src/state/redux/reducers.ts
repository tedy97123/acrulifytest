// reducers.ts
import { EDIT_PRODUCT, VIEW_PRODUCT } from './actions';

const initialState = {
  products: [], // Initialize products as an empty array or with any default values you need.
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EDIT_PRODUCT:
      return {
        products: [...state.products, action.payload],
      };
    case VIEW_PRODUCT:
      return {
        products: action.payload, // Consider if you want to merge or replace existing products.
      };
    default:
      return state;
  }
};

export default productReducer;
