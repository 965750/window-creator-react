export const clearNotification = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION',
  })
}

export const setLocalLang = (lang) => (dispatch) => {
  localStorage.lang = lang

  dispatch({
    type: 'SET_LOCAL_LANG',
    lang,
  })
}

export const checkLocation = () => (dispatch) => {
  if (
    navigator.language === 'pl'
    || navigator.language === 'pl-PL'
  ) {
    localStorage.lang = 'pl'
    dispatch({
      type: 'SET_LOCAL_LANG',
      lang: 'pl',
    })
  }
}

export const setNotification = (notification, notificationType) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    notification,
    notificationType,
  })
}

export const changeStep = (step) => (dispatch) => {
  dispatch({
    type: 'CHANGE_STEP',
    step,
  })
}
