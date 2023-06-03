def matrix_multiply(matrix, vector):
    result = [0, 0]
    result[0] = (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26
    result[1] = (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26
    return result

def find_inverse(matrix):
    det = matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0]
    det = det % 26
    det_inv = -1
    for i in range(26):
        if (det * i) % 26 == 1:
            det_inv = i
            break
    if det_inv == -1:
        print("A matriz não é invertível")
        return None
    inv_matrix = [[matrix[1][1]*det_inv % 26, -matrix[0][1]*det_inv % 26],
                  [-matrix[1][0]*det_inv % 26, matrix[0][0]*det_inv % 26]]
    return inv_matrix

def decrypt(message, key_matrix):
    alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY"
    decrypted_message = ""
    inv_key_matrix = find_inverse(key_matrix)
    if inv_key_matrix is None:
        return None
    for i in range(0, len(message), 2):
        vector = [alphabet.index(message[i]), alphabet.index(message[i+1])]
        result = matrix_multiply(inv_key_matrix, vector)
        decrypted_message += alphabet[result[0]] + alphabet[result[1]]

    # Verifica se a mensagem termina com 'Z' e, se sim, remove.
    if decrypted_message[-1] == 'Z':
        decrypted_message = decrypted_message[:-1]

    return decrypted_message

def main_decrypt(message):
    key_matrix = [[1, 3], [1, 2]]
    decrypted_message = decrypt(message, key_matrix)
    return decrypted_message
