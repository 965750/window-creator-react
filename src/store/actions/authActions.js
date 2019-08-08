export const createAccount = (account) => {
    return (dispatch, getState) => {
        //make async call to database then continue with dispatch
        dispatch({
            type: 'CREATE_ACCOUNT',
            account
        })
    }
}