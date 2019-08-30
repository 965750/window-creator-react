import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

import creatorReducer from './creatorReducer'
import themeReducer from './themeReducer'

const rootReducer = combineReducers({
  theme: themeReducer,
  creator: creatorReducer,
  firebase: firebaseReducer,
})

export default rootReducer
