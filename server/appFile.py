from flask import Flask, request, jsonify
from flask_marshmallow import Marshmallow


app = Flask(__name__)

ma = Marshmallow(app)