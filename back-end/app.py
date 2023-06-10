from flask import Flask, jsonify, request
from flask_cors import CORS
<<<<<<< HEAD
from calc import *
from encrypt import *
from decrypt import *
=======
from app import *
from decrypt import *
from encrypt import *
>>>>>>> e43b944232813d5992599c992dee45b152a52b68
import oracledb

# Cria uma instância da classe Flask para a aplicação.
app = Flask(__name__)

# Aplica o CORS à aplicação, permitindo solicitações de origens diferentes
CORS(app)

connection = oracledb.connect(
    user="system",
<<<<<<< HEAD
    password="senha",
=======
    password="ef",
>>>>>>> e43b944232813d5992599c992dee45b152a52b68
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
<<<<<<< HEAD
        qualificacao, efeitos_saude = mainClass(mp10,mp25,o3,co,no2,so2)
        qualificacao = main_encrypt(qualificacao)
        res = main_decrypt(qualificacao)
        print(f'Criptografado: {qualificacao} Descriptografado: {res}')

        comando = f"INSERT INTO Amostras (mp10, mp25, o3, co, no2, so2, classificacao) VALUES ('{mp10}', '{mp25}', '{o3}', '{co}', '{no2}', '{so2}','{qualificacao}')"
=======

        comando = f"INSERT INTO Amostras (mp10, mp25, o3, co, no2, so2) VALUES ('{mp10}', '{mp25}', '{o3}', '{co}', '{no2}', '{so2}')"

>>>>>>> e43b944232813d5992599c992dee45b152a52b68
        cursor.execute(comando)
        connection.commit()

        return jsonify({'message': 'Amostra inserida com sucesso'}), 201


<<<<<<< HEAD
@app.route("/alterar", methods=["GET", "POST", "DELETE"])
=======
@app.route("/alterar", methods=["GET", "POST"])
>>>>>>> e43b944232813d5992599c992dee45b152a52b68
def alter():
    if request.method == "GET":
        # Puxa os valores do banco de dados e coloca eles na tabela
        data = []
        for row in cursor.execute("SELECT * FROM Amostras ORDER BY ID ASC"):
            print(
                f"ID:{row[0]}  MP10:{row[1]} --- MP25:{row[2]} --- O3:{row[3]} --- CO:{row[4]} --- NO2:{row[5]} --- SO2:{row[6]}")

            data.append({
                "ID": row[0],
                "MP10": row[1],
                "MP25": row[2],
                "O3": row[3],
                "CO": row[4],
                "NO2": row[5],
                "SO2": row[6]
            })

        return jsonify(data), 201

    # Atualiza os dados
    if request.method == "POST":
        data = request.get_json()
        id = data['id']
        mp10 = data['mp10']
        mp25 = data['mp25']
        o3 = data['o3']
        co = data['co']
        no2 = data['no2']
        so2 = data['so2']

        comando = f"UPDATE Amostras SET mp10 = '{mp10}', mp25 = '{mp25}', o3 = '{o3}', co = '{co}', no2 = '{no2}', so2 = '{so2}' WHERE ID = {id}"

        cursor.execute(comando)
        connection.commit()

        return jsonify({'message': 'Amostra atualizada com sucesso'}), 200

@app.route("/alterar/<int:id>", methods=["DELETE"])
def delete_data(id):
    try:
        # Execute o comando SQL para excluir o item com o ID fornecido
        comando = f"DELETE FROM Amostras WHERE ID = {id}"
        cursor.execute(comando)
        connection.commit()

        return jsonify({'message': 'Amostra excluída com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
<<<<<<< HEAD
    app.run(port=3000,debug=True)
=======
    app.run(port=3000)
>>>>>>> e43b944232813d5992599c992dee45b152a52b68
