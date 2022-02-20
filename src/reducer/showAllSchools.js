import { SET_SHOW_ALL_SCHOOL, UNSET_SHOW_ALL_SCHOOL} from '../actions/showAllSchools'

export default function school(state=null, action){
    switch(action.type){
            case SET_SHOW_ALL_SCHOOL:

            return true
            case UNSET_SHOW_ALL_SCHOOL:

            return false
                
        default:
            return state
    }
}