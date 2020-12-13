import { SET_USER, LOGOUT_USER } from '../types/user'

export const set_user = (payload) => ({
    type: SET_USER,
    payload,
})

export const logout_user = () => ({
    type: LOGOUT_USER,
})
