import {RECEIVE_RECORDS} from '../actions/records'

export default function records(state=[], action){
    switch(action.type){
        case RECEIVE_RECORDS:
            const record=[action.records]
            return{
                ...state,
                ...record
            }
            default:
            return state
    }
}