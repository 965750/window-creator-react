import axios from 'axios'

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
  navigator.geolocation.getCurrentPosition((pos) => {
    axios
      .get(
        `http://api.geonames.org/countryCodeJSON?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&username=a965750`,
      )
      .then((data) => {
        localStorage.lang = data.data.languages
        dispatch({
          type: 'SET_LOCAL_LANG',
          lang: data.data.languages,
        })
      })
      .catch(() => {
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
      })
  })
}

export const setNotification = (notification, notificationType) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    notification,
    notificationType,
  })
}

export const isLoading = (loading) => (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    isLoading: loading,
  })
}

export const changeStep = (step) => (dispatch) => {
  dispatch({
    type: 'CHANGE_STEP',
    step,
  })
}
