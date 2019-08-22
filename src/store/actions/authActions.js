import cookies from 'js-cookie'

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

export const login = credentials => {
    return async (dispatch, getState) => {
        // const res = await axios.get('https://api.github.com/search/repositories?q=topic:react+topic:js')
        const accounts = [
            {
                login: '123',
                password: '321',
                userToken: '987214asdDAS1237DAW',
            },
        ]

        const accountExist = accounts.find(acc => {
            return (
                acc.login === credentials.email &&
                acc.password === credentials.password
            )
        })

        if (accountExist) {
            if (credentials.remember) {
                cookies.set('userToken', accountExist.userToken)
            }
            sessionStorage.setItem('userToken', accountExist.userToken)

            dispatch({
                type: 'CLEAR_NOTIFICATION',
            })

            dispatch({
                type: 'SET_LOADING',
                isLoading: true,
            })

            dispatch({
                type: 'LOGIN_SUCCESS',
                userToken: accountExist.userToken,
            })
        } else {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: 'Invalid email or password',
            })

            dispatch({
                type: 'LOGIN_FAILED',
            })
        }
    }
}
