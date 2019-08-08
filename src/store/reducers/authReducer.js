const initState = {
    myAccount: {
        name: 'MyName',
        lastName: 'MyLastName',
        age: '27'
    }
}

const authReducer = (state = initState, action) => {
    switch (action.type ) {
        case 'CREATE_ACCOUNT':
            console.log('created AACCCOUNT', action.account)
            console.log(state)
            return {
                ...state,
                added: action.account
            }
    }
    return state
}

export default authReducer