# Importa os módulos necessários do Flask e do pacote flask_cors
from flask import Flask, jsonify, request
from flask_cors import CORS

# Importa os módulos calc, encrypt, decrypt e oracledb
from calc import *
from encrypt import *
from decrypt import *
import oracledb

# Cria uma instância da classe Flask para a aplicação.
app = Flask(__name__)

# Aplica o CORS à aplicação, permitindo solicitações de origens diferentes
CORS(app)

# Estabelece a conexão com o banco de dados Oracle
connection = oracledb.connect(user="system", password="ef", dsn="localhost:1521/xe")

print("Successfully connected to Oracle Database")

# Cursor usado para executar comandos SQL no banco de dados
cursor = connection.cursor()

# Define uma rota para a raiz do aplicativo ("/") que pode lidar com solicitações GET e POST
@app.route("/", methods=["GET", "POST"])
def simple():
    if request.method == "GET":
        # Executa uma consulta SQL para calcular as médias dos valores em uma tabela chamada "Amostras"
        cursor.execute(
            "SELECT AVG(MP10), AVG(MP25), AVG(O3), AVG(CO), AVG(NO2), AVG(SO2) FROM Amostras"
        )

        # Retorna a primeira linha de resultado da consulta como uma tupla
        retorno = cursor.fetchone()

        # Imprime as médias calculadas
        print(f"Media de MP10: {retorno[0]:.2f}")
        print(f"Media de MP25: {retorno[1]:.2f}")
        print(f"Media de O3: {retorno[2]:.2f}")
        print(f"Media de CO: {retorno[3]:.2f}")
        print(f"Media de NO2: {retorno[4]:.2f}")
        print(f"Media de SO2: {retorno[5]:.2f}")

        # Chama a função mainClass passando as médias como argumentos e armazena o resultado em qualificacao e efeitos_saude
        qualificacao, efeitos_saude = mainClass(
            retorno[0], retorno[1], retorno[2], retorno[3], retorno[4], retorno[5]
        )

        # Retorna um objeto JSON contendo a classificação e os efeitos à saúde
        return {"classification": [f"{qualificacao}", f"{efeitos_saude}"]}

    if request.method == "POST":
        # Obtém os dados JSON enviados na solicitação POST
        data = request.get_json()
        mp10 = data["mp10"]
        mp25 = data["mp25"]
        o3 = data["o3"]
        co = data["co"]
        no2 = data["no2"]
        so2 = data["so2"]

        # Chama a função mainClass passando os dados como argumentos e armazena o resultado em qualificacao e efeitos_saude
        qualificacao, efeitos_saude = mainClass(mp10, mp25, o3, co, no2, so2)

        # Criptografa a qualificacao usando a função main_encrypt
        qualificacao = main_encrypt(qualificacao)

        # Descriptografa a qualificacao usando a função main_decrypt
        res = main_decrypt(qualificacao)

        # Imprime a qualificacao criptografada e a qualificacao descriptografada
        print(f"Criptografado: {qualificacao} Descriptografado: {res}")

        # Monta o comando SQL para inserir os dados na tabela "Amostras"
        comando = f"INSERT INTO Amostras (mp10, mp25, o3, co, no2, so2, classificacao) VALUES ('{mp10}', '{mp25}', '{o3}', '{co}', '{no2}', '{so2}','{qualificacao}')"

        # Executa o comando SQL no banco de dados
        cursor.execute(comando)
        connection.commit()

        # Retorna uma resposta JSON com uma mensagem informando que a amostra foi inserida com sucesso
        return jsonify({"message": "Amostra inserida com sucesso"}), 201


@app.route("/alterar", methods=["GET", "POST"])
def alter():
    if request.method == "GET":
        # Realiza uma consulta SQL para obter todos os dados da tabela "Amostras" e os coloca em uma lista
        data = []
        for row in cursor.execute("SELECT * FROM Amostras ORDER BY ID ASC"):
            # Imprime cada linha retornada da consulta
            print(
                f"ID:{row[0]}  MP10:{row[1]} --- MP25:{row[2]} --- O3:{row[3]} --- CO:{row[4]} --- NO2:{row[5]} --- SO2:{row[6]}"
            )

            # Adiciona um dicionário contendo os dados da linha na lista "data"
            data.append(
                {
                    "ID": row[0],
                    "MP10": row[1],
                    "MP25": row[2],
                    "O3": row[3],
                    "CO": row[4],
                    "NO2": row[5],
                    "SO2": row[6],
                }
            )

        # Retorna a lista "data" como uma resposta JSON
        return jsonify(data), 201

    # Atualiza os dados
    if request.method == "POST":
        # Obtém os dados JSON enviados na solicitação POST
        data = request.get_json()
        id = data["id"]
        mp10 = data["mp10"]
        mp25 = data["mp25"]
        o3 = data["o3"]
        co = data["co"]
        no2 = data["no2"]
        so2 = data["so2"]

        # Monta o comando SQL para atualizar os dados na tabela "Amostras"
        comando = f"UPDATE Amostras SET mp10 = '{mp10}', mp25 = '{mp25}', o3 = '{o3}', co = '{co}', no2 = '{no2}', so2 = '{so2}' WHERE ID = {id}"

        # Executa o comando SQL no banco de dados
        cursor.execute(comando)
        connection.commit()

        # Retorna uma resposta JSON com uma mensagem informando que a amostra foi atualizada com sucesso
        return jsonify({"message": "Amostra atualizada com sucesso"}), 200


@app.route("/alterar/<int:id>", methods=["DELETE"])
def delete_data(id):
    try:
        # Executa o comando SQL para excluir o item com o ID fornecido
        comando = f"DELETE FROM Amostras WHERE ID = {id}"
        cursor.execute(comando)
        connection.commit()

        # Retorna uma resposta JSON com uma mensagem informando que a amostra foi excluída com sucesso
        return jsonify({"message": "Amostra excluída com sucesso"}), 200
    except Exception as e:
        # Retorna uma resposta JSON com uma mensagem de erro se ocorrer uma exceção
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Executa a aplicação Flask na porta 3000 com o modo de depuração ativado
    app.run(port=3000, debug=True)
