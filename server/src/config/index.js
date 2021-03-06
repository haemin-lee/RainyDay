export default {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    finastra_client_id: process.env.finastra_client_id,
    finastra_client_secret: process.env.finastra_client_secret,
    projectId: process.env.projectId, // google cloud project id
    base_url: process.env.base_url,
    token_path: process.env.token_path,
    authorize_path: process.env.authorize_path,
    redirect_uri: process.env.redirect_uri,
    db_connection_url: process.env.db_connection_url,
    FLASK_PORT: process.env.FLASK_PORT,
}
