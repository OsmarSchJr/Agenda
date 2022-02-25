import axios from "axios";

const URL = "http://localhost:3003/api/agendas"

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHARGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().agenda.description
        const search = description ? `&description__regex=/${description}/`: ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'AGENDA_SEARCHED',payload: resp.data}))
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = (agenda) => {
    return dispatch => {
        axios.put(`${URL}/${agenda._id}`, { ...agenda, done: true})
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (agenda) => {
    return dispatch => {
        axios.put(`${URL}/${agenda._id}`,{ ...agenda, done: false})
            .then(resp => dispatch(search()))
    }
}

export const remove = (agenda) => {
    return dispatch => {
        axios.delete(`${URL}/${agenda._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return[{ type: 'TODO_CLEAR' },search()]
}