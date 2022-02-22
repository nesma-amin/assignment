import {combineReducers} from 'redux'
import camp from './camp'
import country from './country'
import school from './school'
import records from './records'
import chart from './chart'
import { loadingBarReducer } from 'react-redux-loading-bar'



export default combineReducers({
    camp,
    country,
    school,
    records,
    chart,
  loadingBar: loadingBarReducer,
})