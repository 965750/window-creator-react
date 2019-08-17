const initState = {
    window: {
        width: 110,
        height: 230,
        doorType: 2,
        rows: ['', '', ''],
        columns: ['', '', ''],
    },
}

const creatorReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RESIZE_WINDOW':
            return {
                ...state,
                window: {
                    ...state.window,
                    [action.size.id]: action.size[action.size.id],
                },
            }
        case 'SET_DOOR_TYPE':
            return {
                ...state,
                window: {
                    ...state.window,
                    doorType: action.doorType,
                },
            }
        case 'SET_DOOR_DIVISION':
            return {
                ...state,
                window: {
                    ...state.window,
                    [action.id]: Array.apply(
                        null,
                        Array(state.window[action.id].length + action.value)
                    ),
                },
            }
    }
    return state
}

export default creatorReducer
