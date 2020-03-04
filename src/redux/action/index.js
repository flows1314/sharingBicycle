export const type={
    SWITCH_MEUN:'SWITCH_MEUN'
}

export function switchMeun(meunName){
    return {
        type:type.SWITCH_MEUN,
        meunName
    }
}