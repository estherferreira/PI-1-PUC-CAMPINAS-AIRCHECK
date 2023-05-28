# Função para determinar o índice de qualidade do ar com base no valor e nos limites fornecidos.
def indice_qualidade_ar(valor, limites):
    # Percorre os limites para encontrar o índice correspondente ao valor.
    for i, (minimo, maximo) in enumerate(limites):
        if minimo <= valor <= maximo:
            return i + 1
    # Retorna -1 caso o valor não corresponda a nenhum índice.
    return -1

# Função para imprimir os efeitos na saúde relacionados à classificação de qualidade do ar.
def imprime_efeitos_saude(classificacao):
    # Dicionário de efeitos na saúde relacionados à classificação.
    efeitos = {
        # ... (efeitos na saúde existentes)
        1: "N1 - Boa: A qualidade do ar é considerada satisfatória e a poluição do ar apresenta pouco ou nenhum risco.",
        2: "N2 - Moderada: Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada.",
        3: "N3 - Ruim: Toda a população pode apresentar sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde.",
        4: "N4 - Muito Ruim: Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas).",
        5: "N5 - Péssima: Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis."
    }

    # Imprime o efeito na saúde relacionado à classificação fornecida.
    print(efeitos[classificacao])
    return efeitos[classificacao]

# Função principal.
def mainClass(mp10, mp25, o3, co, no2, so2):
    # Limites para os índices de qualidade do ar para cada poluente.
    limites_MP10 = [(0, 50), (50, 100), (100, 150), (150, 250), (250, float('inf'))]
    limites_MP25 = [(0, 25), (25, 50), (50, 75), (75, 125), (125, float('inf'))]
    limites_O3 = [(0, 100), (100, 130), (130, 160), (160, 200), (200, float('inf'))]
    limites_CO = [(0, 9), (9, 11), (11, 13), (13, 15), (15, float('inf'))]
    limites_NO2 = [(0, 200), (200, 240), (240, 320), (320, 1130), (1130, float('inf'))]
    limites_SO2 = [(0, 20), (20, 40), (40, 365), (365, 800), (800, float('inf'))]

    # Calcula o índice de qualidade do ar para cada poluente.
    indices = [
        indice_qualidade_ar(mp10, limites_MP10),
        indice_qualidade_ar(mp25, limites_MP25),
        indice_qualidade_ar(o3, limites_O3),
        indice_qualidade_ar(co, limites_CO),
        indice_qualidade_ar(no2, limites_NO2),
        indice_qualidade_ar(so2, limites_SO2),
    ]

    # Determina a classificação geral de qualidade do ar com base nos índices calculados.
    qualidade_ar = max(indices)
    qualificacoes = ["Boa", "Moderada", "Ruim", "Muito Ruim", "Péssima"]

    # Imprime a classificação geral de qualidade do ar.
    print(f"A qualidade do ar é classificada como: {qualificacoes[qualidade_ar - 1]}")
    qualificacao = str(qualificacoes[qualidade_ar - 1])

    # Imprime os efeitos na saúde relacionados à classificação de qualidade do ar.
    efeitos_saude = imprime_efeitos_saude(qualidade_ar)

    # Retorna a qualificação e os efeitos na saúde.
    return qualificacao, efeitos_saude

# Chama a função principal.
""" mainClass() """