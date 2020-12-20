// Implements server analysis API
// TODO
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_analysis(data) {
        const uri = '/analyze'

        const res = await instance.post(url + uri, data)
        console.log(res)
        return res
    }

    return {
        get_analysis,
    }
}
