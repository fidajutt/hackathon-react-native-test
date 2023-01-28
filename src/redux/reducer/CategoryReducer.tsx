
import { ActionList, CategoryAction, } from './../action/CategoriesAction';

export interface CategoryState {
    [x: string]: any;
    categoryList: [] | null;
}

const initialState = {
  categoryList: null
}

export const CategoryReducer = (state: CategoryState = initialState, action: CategoryAction) => {
    switch (action.type) {
        case ActionList.GET_CATEGORY: {
            return { ...state, categoryList: action.payload }
        }        
        case ActionList.DELETE_CATEGORY: {
          return { ...state, categoryList: action.payload }
        }
        case ActionList.ADD_CATEGORY: {
          return { ...state, categoryList: action.payload }
        }
        default:
            return state;
    }
}