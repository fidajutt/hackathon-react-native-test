
//interface to describe action
export interface CategoryAction{
    type: string;
    payload: Array<string>;
};

//all actions are to be added here
export const ActionList = {
    ADD_CATEGORY: "ADD_CATEGORY",
    GET_CATEGORY: "GET_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY"
}

//making action calls as function
export const SaveCategories = (menuList: Array<string> = []): CategoryAction => ({
    type: ActionList.ADD_CATEGORY,
    payload: menuList
})
