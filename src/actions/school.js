export const SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL'
export const UNSET_SELECTED_SCHOOL = 'UNSET_SELECTED_SCHOOL'


export function setSelectedSchool(school){
    return{
        type:SET_SELECTED_SCHOOL,
        school,
    }
}

export function unsetSelectedSchool(){
    return{
        type:UNSET_SELECTED_SCHOOL,
        
    }
}
