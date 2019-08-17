const initState = {
    notification: null,
    isLoading: false,
    stepper: {
        active: 1,
        steps: [
            {
                label: 'Step 1',
                title: 'Choose Door',
                id: 1,
            },
            {
                label: 'Step 2',
                title: 'Choose Door Division',
                id: 2,
            },
            {
                label: 'Step 3',
                title: 'Choose Color',
                id: 3,
            },
        ],
    },
}

const themeReduceer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.notification,
            }
        case 'CLEAR_NOTIFICATION':
            return {
                ...state,
                notification: null,
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case 'CHANGE_STEP':
            return {
                ...state,
                stepper: {
                    ...state.stepper,
                    active: action.step,
                },
            }
    }
    return state
}

export default themeReduceer
