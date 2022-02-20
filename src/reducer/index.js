import {combineReducers} from 'redux'
import camp from './camp'
import country from './country'
import school from './school'
import records from './records'
import showAllSchools from './showAllSchools'

// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    camp,
    country,
    school,
    records,
    showAllSchools
  // loadingBar: loadingBarReducer,
})