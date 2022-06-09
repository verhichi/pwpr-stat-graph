import flask
from flask import request, jsonify
from data import players

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/api/players', methods=['GET'])
def get_players():
    return jsonify(players)

app.run()