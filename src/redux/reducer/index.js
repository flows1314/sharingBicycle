import {type} from '../action'
const initialState={
    meunName:'首页',
    name:'如果有其他参数'
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case type.SWITCH_MEUN:
            return {
                ...state,         //解构state，保留原有状态，name将会保留
                meunName:action.meunName
            }
        default:
            return {...state};
    }
}