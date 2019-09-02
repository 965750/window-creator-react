export const resizeWindow = (size) => (dispatch) => {
  dispatch({
    type: 'RESIZE_WINDOW',
    size,
  })
}

export const changeColorBox = (id, color) => (dispatch) => {
  dispatch({
    type: 'CHANGE_COLOR_BOX',
    id,
    color,
  })
}

export const changeWindowType = (doorType) => (dispatch) => {
  dispatch({
    type: 'SET_DOOR_TYPE',
    doorType,
  })
}

export const removeWindowSave = (id) => (dispatch, getState, { getFirebase, getFirestore }) => { // eslint-disable-line
  const firestore = getFirestore()
  const userUid = getState().firebase.auth.uid
  const windowToDelete = getState().firebase.profile.windows.find((window) => window.id === id)

  firestore.collection('users').doc(userUid).update({
    windows: firestore.FieldValue.arrayRemove(windowToDelete),
  }).then(() => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: 'Saved window has been removed',
      notificationType: 'success',
    })
  })
    .catch(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'We could not remove Your saved window, try again later',
        notificationType: 'error',
      })
    })
}

export const saveWindow = (name) => (dispatch, getState, { getFirebase, getFirestore }) => { // eslint-disable-line
  const firestore = getFirestore()
  const userUid = getState().firebase.auth.uid
  const windowToSave = getState().creator.window
  const currentSavesNumber = getState().firebase.profile.windows.length

  if (currentSavesNumber > 4) {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: 'You have reached limit of saved windows, delete older first',
      notificationType: 'error',
    })
  } else {
    const fullWindow = {
      ...windowToSave,
      id: `_${Math.random().toString(36).substr(2, 9)}`,
      save: {
        name,
        time: Date.now(),
      },
    }

    firestore.collection('users').doc(userUid).update({
      windows: firestore.FieldValue.arrayUnion(fullWindow),
    }).then(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Your current window has been saved',
        notificationType: 'success',
      })
    })
      .catch(() => {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: 'We could not save Your window, try again later',
          notificationType: 'error',
        })
      })
  }
}

export const loadWindow = (id) => (dispatch, getState) => {
  const { windows } = getState().firebase.profile
  const windowToLoad = windows.find((window) => window.id === id)

  dispatch({
    type: 'SET_NOTIFICATION',
    notification: 'Window has been loaded',
    notificationType: 'success',
  })

  dispatch({
    type: 'SET_WINDOW',
    window: windowToLoad,
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
