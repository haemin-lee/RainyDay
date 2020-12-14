import { SET_USER, LOGOUT_USER } from '../types/user'

const initial_state = {}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload }
        case LOGOUT_USER:
            return { ...initial_state }
        default:
            return state
    }
}
