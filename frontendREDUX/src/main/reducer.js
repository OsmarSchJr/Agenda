import { combineReducers } from 'redux'
import agendaReducer from '../agenda/agendaReducer'

const rootReducer = combineReducers({
    agenda: agendaReducer
})

export default rootReducer