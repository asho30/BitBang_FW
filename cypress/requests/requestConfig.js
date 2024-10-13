const config = require('../config')

const request_config = {
    method: 'POST',
    url: config.graphql.url,
    headers:
        { Host: config.graphql.headers.Host }
}

module.exports = {
    request_config
}