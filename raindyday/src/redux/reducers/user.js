import { SET_USER } from '../types/user'

const initial_state = {}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
