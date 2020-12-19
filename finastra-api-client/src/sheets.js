// Implements server sheets API
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_sheets() {
        const uri = '/sheets'

        const res = await instance.get(url + uri)

        return res
    }

    // could be post sheets later depending on infrastructure design
    async function post_sheet(data) {
        const uri = '/sheets'

        const res = await instance.post(url + uri, data)

        return res
    }

    return {
        get_sheets,
        post_sheet,
    }
}
