import {combineReducers} from 'redux'
import camp from './camp'
import country from './country'
import school from './school'
// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    camp,
    country,
    school,
  // loadingBar: loadingBarReducer,
})