export const resizeWindow = (size) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'RESIZE_WINDOW',
            size
        })
    }
}

export const changeDoorType = (doorType) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_DOOR_TYPE',
            doorType
        })
    }
}