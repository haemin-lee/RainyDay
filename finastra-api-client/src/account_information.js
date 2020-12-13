const endpoints = require('./endpoint')
const validate_params = require('./helpers/validate_params')

// Implements the Finastra Accounts and Balances API
// https://developer.fusionfabric.cloud/api/corporate-accounteinfo-me-v1-831cb09d-cc10-4772-8ed5-8a6b72ec8e01/docs
module.exports = (instance) => {
    const url = endpoints.accounts_url
    // This API returns a list of accounts for the authenticated corporate user
    async function get_accounts_information() {
        const uri = '/accounts'

        const account_res = await instance.get(url + uri)

        return account_res
    }

    // This API returns the Account Details for a single account
    async function get_account(account_id) {
        const uri = `/accounts/${account_id}`

        const account_res = await instance.get(url + uri)

        return account_res
    }

    // This API returns the Account Statement Details for a single account
    async function get_account_statement(account_id, options) {
        // Error handling
        const required_params = ['fromDate', 'toDate']
        const allowed_params = ['limit', 'offset']

        validate_params(required_params, allowed_params, options)

        const uri = `/accounts/${account_id}/statement`

        const statement_res = await instance.get(url + uri, {
            params: options,
        })

        return statement_res
    }

    // This API returns the Account Balances by account types. If equivalent currency is requested, the balances will be converted and displayed in the equivalent currency
    async function get_balances_by_account_type(options) {
        const required_params = []
        const allowed_params = [
            'accountTypeForBalance',
            'equivalentCurrency',
            'limit',
            'offset',
        ]

        validate_params(required_params, allowed_params, options)

        const uri = `/accounts/balances-by-account-type`

        const balances_res = await instance.get(url + uri, {
            params: options,
        })

        return balances_res
    }

    // This API returns the Account Balances of a particular account
    async function get_account_balance(account_id) {
        const uri = `/accounts/${account_id}/balances`

        const balance_res = await instance.get(url + uri)

        return balance_res
    }

    return {
        get_accounts_information,
        get_account,
        get_account_statement,
        get_balances_by_account_type,
        get_account_balance,
    }
}
