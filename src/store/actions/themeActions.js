export const clearNotification = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_NOTIFICATION'
        })
    }
}

export const isLoading = (loading) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_LOADING',
            isLoading: loading
        })
    }
}

export const changeStep = (step) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CHANGE_STEP',
            step
        })
    }
}