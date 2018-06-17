import React from 'react'
import { li } from 'react-bootstrap'
export const SuggestionList = (props)=>{
    const { suggestion,onClickSuggestion } = props
    const { firstName, lastName } = suggestion
        return(
            <li className="list-group-item" onClick={onClickSuggestion}>
                {firstName  + "  " + lastName}
            </li>
        )
}