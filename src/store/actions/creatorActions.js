export const resizeWindow = size => {
    return (dispatch, getState) => {
        dispatch({
            type: 'RESIZE_WINDOW',
            size,
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
    console.log(value, id, 2222222222)
    // Array.apply(null, Array(5))
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_DOOR_DIVISION',
            value,
            id,
        })
    }
}
