module.exports = function validate_params(
    required_params,
    allowed_params,
    options
) {
    // Error handling
    for (const param of required_params) {
        if (!(param in options))
            throw `Required param ${param} not in options object`
    }

    for (const param in options) {
        if (!(required_params.include(param) || allowed_params.include(param)))
            throw `Param ${param} is not a valid param`
    }
}
