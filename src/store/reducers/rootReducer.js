import authReducer from './authReducer'
import themeReducer from './themeReducer'
import creatorReducer from './creatorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    creator: creatorReducer
})

export default rootReducer