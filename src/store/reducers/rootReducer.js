import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import themeReducer from './themeReducer'
import creatorReducer from './creatorReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    creator: creatorReducer,
    firebase: firebaseReducer,
})

export default rootReducer
