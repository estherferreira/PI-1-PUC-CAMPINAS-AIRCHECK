from flask import Flask, jsonify, request
from flask_cors import CORS
from app import *
import os
import oracledb

app = Flask(__name__)
CORS(app)

connection = oracledb.connect(
    user="system",
    password="ef",
    dsn="localhost:1521/xe")

print("Successfully connected to Oracle Database")

os.system('pause')
os.system('cls')

cursor = connection.cursor()

@app.route("/", methods=["GET", "POST"])
def handle_request():
    if request.method == "GET":
        return "Success"

    if request.method == "POST":
        data = request.get_json()
        mp10 = data['mp10']
        mp25 = data['mp25']
        o3 = data['o3']
        co = data['co']
        no2 = data['no2']
        so2 = data['so2']

        comando = f"INSERT INTO Amostras (mp10, mp25, o3, co, no2, so2) VALUES ('{mp10}', '{mp25}', '{o3}', '{co}', '{no2}', '{so2}')"

        cursor.execute(comando)
        connection.commit()

        return jsonify({'message': 'Amostra inserida com sucesso'}), 201

if __name__ == "__main__":  
    app.run(port=3000)