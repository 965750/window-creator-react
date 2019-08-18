const initState = {
    colorBoxes: [
        {
            id: '1',
            color: '#000',
            label: 'Black',
            active: true,
        },
        {
            id: '2',
            color: '#797474',
            label: 'Gray',
            active: false,
        },
        {
            id: '3',
            color: '#f4f2f2',
            label: 'White',
            active: false,
        },
    ],
    window: {
        color: '#000',
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
        case 'CHANGE_COLOR_BOX':
            const localColorBoxes = state.colorBoxes.map(box => ({
                ...box,
                active: action.id === box.id,
            }))

            return {
                ...state,
                colorBoxes: localColorBoxes,
            }
    }
    return state
}

export default creatorReducer
