export const SET_SELECTED_CHART_SCHOOL = 'SET_SELECTED_CHART_SCHOOL'
export const UNSET_SELECTED_CHART_SCHOOL = 'UNSET_SELECTED_CHART_SCHOOL'
export const SET_SELECTED_CHART_LESSONS = 'SET_SELECTED_CHART_LESSONS'
export const UNSET_SELECTED_CHART_LESSONS = 'UNSET_SELECTED_CHART_LESSONS'

export function setSelectedChartSchool(chartSchool){
    return{
        type:SET_SELECTED_CHART_SCHOOL,
        chartSchool,
    }
}

export function unsetSelectedChartSchool(){
    return{
        type:UNSET_SELECTED_CHART_LESSONS,
        
    }
}
export function setSelectedChartLessons(chartLessons){
    return{
        type:SET_SELECTED_CHART_LESSONS,
        chartLessons,
    }
}

export function unsetSelectedChartLessons(){
    return{
        type:UNSET_SELECTED_CHART_LESSONS,
        
    }
}