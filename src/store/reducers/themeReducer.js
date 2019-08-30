const initState = {
  lang: 'en',
  notification: null,
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
        notification: {
          text: action.notification,
          type: action.notificationType,
        },
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null,
      }
    case 'SET_LOCAL_LANG':
      return {
        ...state,
        lang: action.lang,
      }
    case 'CHANGE_STEP':
      return {
        ...state,
        stepper: {
          ...state.stepper,
          active: action.step,
        },
      }
    default:
      return state
  }
}

export default themeReduceer
