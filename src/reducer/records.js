import {RECEIVE_RECORDS} from '../actions/records'

export default function records(state=[], action){
    switch(action.type){
        case RECEIVE_RECORDS:
            return{
                ...state,
                ...action.records
            }
            default:
            return state
    }
}