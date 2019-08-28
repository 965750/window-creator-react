export const resizeWindow = size => {
    return (dispatch, getState) => {
        dispatch({
            type: 'RESIZE_WINDOW',
            size,
        })
    }
}

export const changeColorBox = id => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_COLOR_BOX',
            id,
        })
    }
}

export const changeWindowType = doorType => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_DOOR_TYPE',
            doorType,
        })
    }
}

export const changeWindowDivision = (value, id) => {
    return (dispatch, getState) => {
        if (getState().creator.window[id].length > 5 - value) {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: 'Maximum number of beams or posts is 4',
                notificationType: 'error',
            })
        } else if (getState().creator.window[id].length > 0 - value) {
            dispatch({
                type: 'SET_DOOR_DIVISION',
                value,
                id,
            })
        }
    }
}
