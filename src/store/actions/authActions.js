export const register = (newUser) => (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) => firestore
      .collection('users')
      .doc(resp.user.uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      }))
    .then(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Your account has been created',
        notificationType: 'success',
      })
    })
    .catch(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'We could not create Your account, try again later',
        notificationType: 'error',
      })
    })
}

export const logout = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'You have been logged out',
        notificationType: 'success',
      })
    })
}

export const loginRemembered = (credentials) => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    })
    .catch(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Invalid email or password',
        notificationType: 'error',
      })
    })
}

export const login = (credentials) => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password))
    .then(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    })
    .catch(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Invalid email or password',
        notificationType: 'error',
      })
    })
}
