import themeReducer from './themeReducer'


describe('Theme Reducer', () => {
  let mockedState

  beforeEach(() => {
    mockedState = {
      lang: 'en',
      notification: {
        notification: 'mockText'
      },
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
        ],
      },
    }
  })

  it('should return changed language', () => {
    const newLang = 'ru'
    const newState = themeReducer(mockedState, {
      type: 'SET_LOCAL_LANG',
      lang: newLang,
    })

    expect(newState).toEqual({
      ...mockedState,
      lang: newLang,
    })
  })

  it('should return changed step', () => {
    const newStep = 3
    const newState = themeReducer(mockedState, {
      type: 'CHANGE_STEP',
      step: newStep,
    })

    expect(newState).toEqual({
      ...mockedState,
      stepper: {
        ...mockedState.stepper,
        active: newStep,
      }
    })
  })

  it('should return empty notification', () => {
    const newState = themeReducer(mockedState, {
      type: 'CLEAR_NOTIFICATION',
    })

    expect(newState).toEqual({
      ...mockedState,
      notification: null,
    })
  })

  it('should return new notification', () => {
    const newNotification = {
      notification: 'newText',
      notificationType: 'success',
    }
    const newState = themeReducer(mockedState, {
      type: 'SET_NOTIFICATION',
      ...newNotification
    })

    expect(newState).toEqual({
      ...mockedState,
      notification: {
        text: newNotification.notification,
        type: newNotification.notificationType,
      }
    })
  })
})