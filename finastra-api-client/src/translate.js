// Implements server translate API
module.exports = (instance, options = {}) => {
    const url = options.server_url + '/api'

    async function get_translation(text, language) {
        const uri = '/translate'

        const data = {
            text: text,
            language: language,
        }

        const res = await instance.post(url + uri, data)

        return res
    }

    return {
        get_translation,
    }
}
