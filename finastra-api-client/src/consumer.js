const endpoints = require('./endpoint')
const validate_params = require('./helpers/validate_params')

// Implements the Finastra Consumer API
// https://developer.fusionfabric.cloud/api/b2b-customer-read-v1-870364be-1dbe-4fe6-a202-fbbc498e0e74/docs
module.exports = (instance) => {
    const url = endpoints.consumer_url
    // Perform a consumer search based on criteria
    async function get_consumers(options) {
        const required_params = []
        const allowed_params = ['firstName', 'lastName', 'userName']
        validate_params(required_params, allowed_params, options)

        const uri = '/consumers'

        const consumer_res = await instance.get(url + uri, {
            params: options,
        })

        return consumer_res
    }

    // Retrieve the profile for the currently logged in user
    async function get_consumer_profile(consumer_id) {
        const uri = `/consumers/${consumer_id}`

        const consumer_res = await instance.get(url + uri)

        return consumer_res
    }

    return {
        get_consumers,
        get_consumer_profile,
    }
}
