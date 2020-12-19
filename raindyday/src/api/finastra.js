import { get_client as gc } from 'finastra-api-client'

export default function get_client() {
    const user = JSON.parse(localStorage.getItem('user'))
    const access_token = user.access_token

    return gc(access_token, { url: '/proxy' })
}

