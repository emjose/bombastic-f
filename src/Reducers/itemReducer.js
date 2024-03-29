// state initialized here:
const initialState = {
    allItems: [],
    sortValue: "All",
    search: ""
}

const itemReducer = (state = initialState, action) => {

    switch(action.type){

        case "FETCH_ITEMS":
            return {...state, allItems: action.items}

        case "DECREASE_ITEM_QUANTITY":
            let updatedItem = state.allItems.map(item => item.id === action.item.id ? action.item : item)
            return {...state, allItems: updatedItem}

        case "INCREASE_ITEM_QUANTITY":
            let newQuantity = state.allItems.map(item => item.id === action.item.id ? action.item : item)
            return {...state, allItems: newQuantity}

        case "SORT_BY_PRICE":
            return {...state, sortValue: action.checkItems}
        
        case "SEARCH_ITEMS":
            return {...state, search: action.value}

        case "SORT_ITEMS":
            return {...state, term: action.payload}

        default:
            return state;
    }
}

export default itemReducer;