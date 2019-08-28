export const resizeWindow = size => dispatch => {
    dispatch({
        type: 'RESIZE_WINDOW',
        size,
    })
}

export const changeColorBox = id => dispatch => {
    dispatch({
        type: 'CHANGE_COLOR_BOX',
        id,
    })
}

export const changeWindowType = doorType => dispatch => {
    dispatch({
        type: 'SET_DOOR_TYPE',
        doorType,
    })
}

export const changeWindowDivision = (value, id) => (dispatch, getState) => {
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
