import {SET_SELECTED_SCHOOL,UNSET_SELECTED_SCHOOL} from "../actions/school";

export default function school(state=null, action){
  switch(action.type){
  case SET_SELECTED_SCHOOL:
  {const school=[action.school];
    return{
      ...school
    };}
  case UNSET_SELECTED_SCHOOL:

  { return null;}
                
  default:
    return state;
  }
}