import {SET_SELECTED_CAMP,UNSET_SELECTED_CAMP} from "../actions/camp";

export default function camp(state=null, action){
  switch(action.type){
  case SET_SELECTED_CAMP:
  {const camp=[action.camp];
    return{
      ...camp
    };}
  case UNSET_SELECTED_CAMP:

  {return null;}
                
  default:
    return state;
  }
}