export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";
export const UNSET_SELECTED_COUNTRY = "UNSET_SELECTED_COUNTRY";

export function setSelectedCountry(country){
  return{
    type:SET_SELECTED_COUNTRY,
    country,
  };
}

export function unsetSelectedCountry(){
  return{
    type:UNSET_SELECTED_COUNTRY,
        
  };
}