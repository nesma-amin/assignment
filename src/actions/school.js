export const SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL'
export const UNSET_SELECTED_SCHOOL = 'UNSET_SELECTED_SCHOOL'
export const SET_SHOW_ALL_SCHOOL = 'SET_SHOW_ALL_SCHOOL'
export const UNSET_SHOW_ALL_SCHOOL = 'UNSET_SHOW_ALL_SCHOOL'


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

export function setShowAllSchools(){
    return{
        type:SET_SHOW_ALL_SCHOOL,
        
    }
}

export function unsetShowAllSchools(){
    return{
        type:UNSET_SHOW_ALL_SCHOOL,
        
    }
}
