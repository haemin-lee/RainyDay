import linear_regression
import predict
from flask import Flask, request, jsonify
import os
import sys
import json
import numpy as np
sys.path.append("../")


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
    #
    @app.route('/predict', methods=['POST'])
    def prediction():
        vacc_levels = request.json
        data = predict.run_prediction(vacc_levels)

        # response = app.response_class(
        #     response=json(data),
        #     status=200,
        #     mimetype='application/json'
        # )
        return jsonify(data)

    @app.route('/knn', methods=['POST'])
    def knn():
        yearly_samples = request.json
        # jenna just plug something right here for data
        # should preferably be a json file but if not we can work with it
        data = k_nearest_neighbors(
            yearly_samples["labeled_x"],
            yearly_samples["labeled_y"],
            yearly_samples["unlabeled_data"]
        )

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response

    @app.route('/lin_regression', methods=['POST'])
    def lin_regression():
        yearly_sample = request.json
        try:
            data = linear_regression.run_lin_regression(yearly_sample)
            return jsonify(data)
            # response = app.response_class(
            #     response=json.dumps(data),
            #     status=200,
            #     mimetype='application/json'
            # )
            # print(response)
            # print("success yay")
            # return response
        except np.linalg.LinAlgError as e:
            print("linalg error")
            response = app.response_class(
                response="singluar matrix ripperoni",
                status=400,
            )
            return response

    return app
