const initialState = {
    loginError: ""
}

const loginErrorsReducer = (state = initialState, action) => {

    switch(action.type){

        case "LOGIN_ERROR":
            return {errors: action.loginError.error}
            
        default: 
            return state
    }
}

export default loginErrorsReducer;