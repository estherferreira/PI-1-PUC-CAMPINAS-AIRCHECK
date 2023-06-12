def matrix_multiply(matrix, vector):
    result = [0, 0]
    result[0] = (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26  # Multiplica a matriz pelos elementos do vetor e aplica o módulo 26
    result[1] = (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26  # Multiplica a matriz pelos elementos do vetor e aplica o módulo 26
    return result

def find_inverse(matrix):
    det = matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0]  # Calcula o determinante da matriz
    det = det % 26  # Aplica o módulo 26 ao determinante
    det_inv = -1  # Inicializa o inverso do determinante como -1
    for i in range(26):
        if (det * i) % 26 == 1:  # Encontra o inverso multiplicativo do determinante
            det_inv = i
            break
    if det_inv == -1:  # Verifica se a matriz não é invertível
        print("A matriz não é invertível")
        return None
    inv_matrix = [[matrix[1][1]*det_inv % 26, -matrix[0][1]*det_inv % 26],  # Calcula a matriz inversa
                  [-matrix[1][0]*det_inv % 26, matrix[0][0]*det_inv % 26]]
    return inv_matrix

def decrypt(message, key_matrix):
    alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY"  # Define o alfabeto utilizado
    decrypted_message = ""
    inv_key_matrix = find_inverse(key_matrix)  # Encontra a matriz inversa da matriz chave
    if inv_key_matrix is None:  # Verifica se a matriz inversa não existe
        return None
    for i in range(0, len(message), 2):  # Itera sobre a mensagem de 2 em 2 caracteres
        vector = [alphabet.index(message[i]), alphabet.index(message[i+1])]  # Obtém os índices dos caracteres na matriz de alfabeto
        result = matrix_multiply(inv_key_matrix, vector)  # Multiplica a matriz inversa da chave pelo vetor
        decrypted_message += alphabet[result[0]] + alphabet[result[1]]  # Adiciona os caracteres correspondentes ao resultado à mensagem descriptografada

    if decrypted_message[-1] == 'Z':  # Verifica se a mensagem termina com 'Z' e, se sim, remove.
        decrypted_message = decrypted_message[:-1]

    return decrypted_message

def main_decrypt(message):
    key_matrix = [[1, 3], [1, 2]]  # Define a matriz chave
    decrypted_message = decrypt(message, key_matrix)  # Descriptografa a mensagem utilizando a matriz chave
    return decrypted_message
