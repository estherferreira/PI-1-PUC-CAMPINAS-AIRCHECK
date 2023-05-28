from flask import Flask, jsonify, request
from flask_cors import CORS
from app import *
import oracledb

# Cria uma instância da classe Flask para a aplicação.
app = Flask(__name__)

# Aplica o CORS à aplicação, permitindo solicitações de origens diferentes
CORS(app)

connection = oracledb.connect(
    user="system",
    password="ef",
    dsn="localhost:1521/xe")

print("Successfully connected to Oracle Database")

# Cursor usado para executar comandos SQL no banco de dados
cursor = connection.cursor()

# Define uma rota para a raiz do aplicativo ("/") que pode lidar com solicitações GET e POST


@app.route("/", methods=["GET", "POST"])
def simple():
    if request.method == "GET":
        cursor.execute(
            "SELECT AVG(MP10), AVG(MP25), AVG(O3), AVG(CO), AVG(NO2), AVG(SO2) FROM Amostras")

        # Retorna a primeira linha de resultado da consulta como uma tupla
        retorno = cursor.fetchone()

        print(f'Media de MP10: {retorno[0]:.2f}')
        print(f'Media de MP25: {retorno[1]:.2f}')
        print(f'Media de O3: {retorno[2]:.2f}')
        print(f'Media de CO: {retorno[3]:.2f}')
        print(f'Media de NO2: {retorno[4]:.2f}')
        print(f'Media de SO2: {retorno[5]:.2f}')

        # "Resultado" recebe retorno da função mainClass
        qualificacao, efeitos_saude = mainClass(retorno[0], retorno[1], retorno[2],
                                                retorno[3], retorno[4], retorno[5])

        return {'classification': [f'{qualificacao}', f'{efeitos_saude}']}

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
