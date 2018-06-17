import { url } from '../Common/constants'
import axios from 'axios'
import {LOAD_USERS,SET_RESULTS,SET_SUGGESTIONS} from '../Common/constants'
import {mergeArrays} from '../Common/Utility'


/**
* Actions call these functions to interact with the server side api
* 
*/

export const searchByName = (dispatch,props,suggestionsFlag=false) => {
    let data={ index:'users',query:props,suggest:suggestionsFlag}
    axios.post('http://localhost:3200/users/search', {data:data},urlOptions)
    .then((res) =>{
        if(suggestionsFlag) {
            let array = mergeArrays(res.data.firstNameSuggester,res.data.lastNameSuggester)
            return dispatch({type: SET_SUGGESTIONS,payload: array})
        }else{
            return dispatch({type: SET_RESULTS,payload: res.data})
        }
    }).catch((err) => console.log(err));
}

export const loadUsers = (dispatch) => {
    axios.get('http://localhost:3200/users',urlOptions)
    .then((res) =>{
       return dispatch({type: LOAD_USERS,payload: res.data})
    }).catch((err) => console.log(err));
}

export const searchBylocation = (props) => {
    
}

export const searchByMobile = (props) => {
    
}

export const searchByInterests = (props) => {
    
}

const urlOptions = {
    'mode': 'no-cors',
    'Content-Type':'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin':'*'
}