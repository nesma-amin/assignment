import {SET_SELECTED_CHART_SCHOOL,UNSET_SELECTED_CHART_SCHOOL,SET_SELECTED_CHART_LESSONS,UNSET_SELECTED_CHART_LESSONS} 
from '../actions/chart'


export default function chart(state=null, action){
    switch(action.type){
        case SET_SELECTED_CHART_SCHOOL:
            const school=action.chartSchool
            return{
                ...school
            }
            case UNSET_SELECTED_CHART_SCHOOL:

                return null
            case SET_SELECTED_CHART_LESSONS:
            const lessons=[action.chartLessons]
            return{
                ...lessons
            }
            case UNSET_SELECTED_CHART_LESSONS:

                return null
        default:
            return state
    }
}