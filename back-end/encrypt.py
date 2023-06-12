def matrix_multiply(matrix, vector):
    result = [0, 0]
    result[0] = (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26  # Multiplica a matriz pelos elementos do vetor e aplica o módulo 26
    result[1] = (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26  # Multiplica a matriz pelos elementos do vetor e aplica o módulo 26
    return result

def encrypt(message, key_matrix):
    alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY"  # Define o alfabeto utilizado
    encrypted_message = ""
    if len(message) % 2 != 0:  # Verifica se o tamanho da mensagem é ímpar
        message += 'Z'  # Adiciona um 'Z' à mensagem para tornar o tamanho par
    for i in range(0, len(message), 2):  # Itera sobre a mensagem de 2 em 2 caracteres
        vector = [alphabet.index(message[i]), alphabet.index(message[i+1])]  # Obtém os índices dos caracteres na matriz de alfabeto
        result = matrix_multiply(key_matrix, vector)  # Multiplica a matriz chave pelo vetor
        encrypted_message += alphabet[result[0]] + alphabet[result[1]]  # Adiciona os caracteres correspondentes ao resultado à mensagem criptografada
    return encrypted_message

def main_encrypt(n):
    key_matrix = [[1, 3], [1, 2]]  # Define a matriz chave
    message = n.replace(" ", "").upper()  # Remove espaços e converte a mensagem para maiúsculas
    message = n.replace("é", "e").upper()  # Substitui "é" por "e" e converte a mensagem para maiúsculas
    encrypted_message = encrypt(message, key_matrix)  # Criptografa a mensagem utilizando a matriz chave
    return encrypted_message
