// Implements loans API
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_loans(zip) {
    	const uri = '/loans/' + zip
        const res = await instance.get(url + uri)
        return res
    }
    return {
        get_loans
    }
}