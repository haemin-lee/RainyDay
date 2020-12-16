const endpoints = require('./endpoint')

// Implements the Corporate User Profile API
// https://developer.fusionfabric.cloud/api/corporate-profile-v1-1ec64da1-0324-48ba-bdf6-7f4678926db8/docs#operation/getAccessPermissions
module.exports = (instance, options = {}) => {
    const url =
        (options.url ? options.url : endpoints.ROOT) +
        endpoints.corporate_profile_url

    async function get_logged_in_user() {
        const uri = '/user-details'

        const account_res = await instance.get(url + uri)

        return account_res
    }

    return {
        get_logged_in_user,
    }
}
