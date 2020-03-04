import {type} from '../action'
const initialState={
    meunName:'首页'
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case type.SWITCH_MEUN:
            return {
                ...state,
                meunName:action.meunName
            }
        default:
            return {...state};
    }
}