from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_marshmallow import Marshmallow

app = Flask(__name__)

cors = CORS(app)
ma = Marshmallow(app)