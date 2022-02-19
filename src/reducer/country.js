import {SET_SELECTED_COUNTRY,UNSET_SELECTED_COUNTRY} from '../actions/country'

export default function country(state=null, action){
    switch(action.type){
        case SET_SELECTED_COUNTRY:
            const country=[action.country]
            return{
                ...country
            }
            case UNSET_SELECTED_COUNTRY:

                return null
                
        default:
            return state
    }
}