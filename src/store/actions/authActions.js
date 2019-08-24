export const createAccount = account => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CREATE_ACCOUNT',
            account,
        })
    }
}

export const wasUserLoggedIn = userToken => {
    return (dispatch, getState) => {
        // should POST userToken for check userData
        dispatch({
            type: 'LOGIN_SUCCESS',
            userToken: userToken,
        })
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                })
            })
    }
}

export const loginRemebered = credentials => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        console.log('remebered login')
        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                console.log('powiodlo siem REMEMBERED')

                dispatch({
                    type: 'CLEAR_NOTIFICATION',
                })

                dispatch({
                    type: 'SET_LOADING',
                    isLoading: true,
                })

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    userToken: 123,
                })
            })
            .catch(() => {
                console.log('powiodlo siem NOPE')
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: 'Invalid email or password',
                })

                dispatch({
                    type: 'LOGIN_FAILED',
                })
            })
    }
}

export const login = credentials => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        console.log('normal login')

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                return firebase
                    .auth()
                    .signInWithEmailAndPassword(
                        credentials.email,
                        credentials.password
                    )
            })
            .then(() => {
                console.log('powiodlo siem')

                dispatch({
                    type: 'CLEAR_NOTIFICATION',
                })

                dispatch({
                    type: 'SET_LOADING',
                    isLoading: true,
                })

                dispatch({
                    type: 'LOGIN_SUCCESS',
                })
            })
            .catch(() => {
                console.log('powiodlo siem NOPE')
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: 'Invalid email or password',
                })

                dispatch({
                    type: 'LOGIN_FAILED',
                })
            })
    }
}
