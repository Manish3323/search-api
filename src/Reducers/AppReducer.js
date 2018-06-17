import Immutable from 'seamless-immutable'
import { CHANGE_TEXT, LOAD_USERS,SET_RESULTS,SET_SUGGESTIONS } from '../Common/constants'

const initialState = Immutable({
  queryText :"",
  users:[],
  results:[],
  suggestions:[]
})

export default function AppReducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_TEXT:
      return { ...state, queryText:action.payload }
    case LOAD_USERS:
      return { ...state, users:action.payload }
    case SET_RESULTS:
      return { ...state, results:action.payload }
    case SET_SUGGESTIONS:
      return { ...state, suggestions:action.payload }
    default:
      return state
  }
}
