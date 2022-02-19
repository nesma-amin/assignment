import {SET_SELECTED_SCHOOL,UNSET_SELECTED_SCHOOL, SET_SHOW_ALL_SCHOOL, UNSET_SHOW_ALL_SCHOOL} from '../actions/school'

export default function school(state=null, action){
    switch(action.type){
        case SET_SELECTED_SCHOOL:
            const school=[action.school]
            return{
                ...school
            }
            case UNSET_SELECTED_SCHOOL:

                return null
            case SET_SHOW_ALL_SCHOOL:

            return true
            case UNSET_SHOW_ALL_SCHOOL:

            return false
                
        default:
            return state
    }
}