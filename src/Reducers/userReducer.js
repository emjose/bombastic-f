const initialState = {
    
}

const userReducer = (state = initialState, action) => {

    switch(action.type){

        case "SET_USER":
            return {...state, ...action.newUser}

        case "PERSIST_USER":
            return {...state, ...action.persistedUser}

        case "DELETE_USER":
            return {...state}

        case "ADD_TO_CART":
            return {...state, cart: [...state.cart, action.cartItem]}

        case "REMOVE_FROM_CART":

            let newArr = state.cart.filter(item => item.id !== action.cartItem.cart_joiner.id)
            return {...state, cart: newArr}

        case "CREATE_ORDER":
            return {...state, cart: [], orders: [...state.orders, action.newOrder]}

        default:
            return state;
    }
}

export default userReducer;