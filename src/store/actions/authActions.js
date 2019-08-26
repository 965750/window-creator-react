export const register = newUser => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
                return firestore
                    .collection('users')
                    .doc(resp.user.uid)
                    .set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                    })
            })
            .then(() => {
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: 'Your account has been created',
                    notificationType: 'success',
                })
            })
            .catch(() => {
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification:
                        'We could not create Your account, try again later',
                    notificationType: 'error',
                })
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

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
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
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: 'Invalid email or password',
                    notificationType: 'error',
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
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: 'Invalid email or password',
                    notificationType: 'error',
                })

                dispatch({
                    type: 'LOGIN_FAILED',
                })
            })
    }
}
