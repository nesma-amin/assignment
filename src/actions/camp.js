export const SET_SELECTED_CAMP = "SET_SELECTED_CAMP";
export const UNSET_SELECTED_CAMP = "UNSET_SELECTED_CAMP";

export function setSelectedCamp(camp){
  return{
    type:SET_SELECTED_CAMP,
    camp,
  };
}

export function unsetSelectedCamp(){
  return{
    type:UNSET_SELECTED_CAMP,
        
  };
}