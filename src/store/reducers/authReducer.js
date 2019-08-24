const initState = {
    myAccount: {
        name: 'MyName',
        lastName: 'MyLastName',
        age: '27',
    },
    isLoggedIn: false,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_ACCOUNT':
            return {
                ...state,
                added: action.account,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
            }
        default:
            return state
    }
    return state
}

export default authReducer
