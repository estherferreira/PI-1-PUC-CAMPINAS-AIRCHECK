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

cursor = connection.cursor()


@app.route("/", methods=["GET", "POST"])
def add_simple():
    if request.method == "GET":
        resultado = print_avarage()
        return f"{resultado}"

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

def print_avarage():
   cursor.execute(
       "SELECT AVG(MP10), AVG(MP25), AVG(O3), AVG(CO), AVG(NO2), AVG(SO2) FROM Amostras")
   retorno = cursor.fetchone()
   
   print(f'Media de MP10: {retorno[0]:.2f}')
   print(f'Media de MP25: {retorno[1]:.2f}')
   print(f'Media de O3: {retorno[2]:.2f}')
   print(f'Media de CO: {retorno[3]:.2f}')
   print(f'Media de NO2: {retorno[4]:.2f}')
   print(f'Media de SO2: {retorno[5]:.2f}')

   resultado = mainClass(retorno[0], retorno[1], retorno[2], retorno[3], retorno[4], retorno[5])
   
   return resultado

if __name__ == "__main__":
    app.run(port = 3000)
