// Implements server user API
// I don't think this will ever be used
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_user() {
        const uri = '/users'

        const res = await instance.get(url + uri)

        return res
    }

    return {
        get_user,
    }
}
