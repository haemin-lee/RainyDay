// Implements server analysis API
// TODO
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_analysis() {
        const uri = '/analyze'

        const res = await instance.get(url + uri)

        return res
    }

    return {
        get_analysis,
    }
}
