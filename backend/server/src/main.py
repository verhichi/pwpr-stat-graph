import flask
from flask import jsonify
from pathlib import Path
import csv

app = flask.Flask(__name__)
app.config["DEBUG"] = True

BASE_PATH = Path(__file__).parent.parent.parent
INPUT_CSV_PATH = str(BASE_PATH / 'accumulator/src/output/20220507_140649.csv')

@app.route('/api/players', methods=['GET'])
def get_players():
    players_data = []

    with open(INPUT_CSV_PATH) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            formatted_data = {
                'id': row['id'],
                'date': row['date'],
                'name': row['name'],
                'pitching_speed': int(row['pitching_speed']),
                'control': int(row['control']),
                'stamina': int(row['stamina'])
            }
            players_data.append(formatted_data)

    return jsonify(players_data)

app.run()