// Implements server sheets API
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_sheets() {
        const uri = '/sheets'

        const res = await instance.get(url + uri)

        return res
    }

    // create new sheet
    async function create_sheet() {
        const uri = '/sheets'

        const res = await instance.post(url + uri)

        return res
    }

    // update sheet
    async function update_sheet(id, data) {
        const uri = `/sheets/${id}`

        const body = {
            data: data,
        }

        const res = await instance.put(url + uri, body)

        return res
    }

    return {
        get_sheets,
        create_sheet,
        update_sheet,
    }
}
