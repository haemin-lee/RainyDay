from flask import Flask, request
import os
import sys
import json
sys.path.append("../")
import predict


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # attempt at sending json file
    # PARAMS:
    # vacc_levels - JSON file encoded as string
    #
    @app.route('/predict', methods=['GET', 'POST', 'PUT'])
    def prediction():
        vacc_levels = json.loads(request.form['vacc_levels'])
        data = predict.run_prediction(vacc_levels)

        response = app.response_class(
            response = json.dumps(data),
            status = 200,
            mimetype = 'application/json'
        )
        return response

    return app
