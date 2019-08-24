import authReducer from './authReducer'
import themeReducer from './themeReducer'
import creatorReducer from './creatorReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    creator: creatorReducer,
    firebase: firebaseReducer,
})

export default rootReducer
