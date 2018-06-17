import { CHANGE_TEXT,LOAD_USERS } from '../Common/constants'
import { searchByName, loadUsers } from '../Common/clientApi'
export const changeText = (text) => {
    return {
        type: CHANGE_TEXT,
        payload: text
    }
}


/**
* Actions Calling front end service to hit api 
* and updating store with the fetched response
*/
export const callSearchByName = (text) => {
        return async (dispatch)=> {
            dispatch(changeText(text))
            return await searchByName(dispatch,text)
         }
}

export const callSuggestionByName = (text) => {
    return async (dispatch)=> {
        dispatch(changeText(text))
        return await searchByName(dispatch,text,true)
     }
}


export const fetchUsers = (text) => {
    return async (dispatch)=> {
               return await loadUsers(dispatch)
            }
}