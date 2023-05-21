from app import *
import getpass
import oracledb
import os

pw = getpass.getpass('Insira a senha:')

connection = oracledb.connect(
    user="YuriUser",
    password=pw,
    dsn="localhost/xe")

print("Successfully connected to Oracle Database")

os.system('pause')
os.system('cls')

cursor = connection.cursor()

def menu():
    print('-----Aircheck-----\n')
    print('1 - Inserir amostras.')
    print('2 - Consultar amostras por ID.')
    print('3 - Remover amostras.')
    print('4 - Media das amostras.')
    print('5 - Exibir tabela completa.')
    print('6 - Alterar amostra.')
    print('0 - Sair.')
    print('\n')

    opcao = int(input('Opção: '))

    if opcao == 1:
        adicionar_amostra()
    elif opcao == 2:
        consultar_amostra()
    elif opcao == 4:
        imprimir_media_poluente()
    elif opcao == 5:
        imprimir_tabela_completa()
    else:
        os.system("cls")
        print('Opção invalida, tente novamente')
        os.system("pause")

def adicionar_amostra():
    os.system('cls')
    print('1 - Inserir amostras\n')

    MP10 = float(input("Insira o valor de partículas inaláveis (MP10): "))
    MP25 = float(input("Insira o valor de partículas inaláveis finas (MP2,5): "))
    O3 = float(input("Insira o valor de ozônio (O3): "))
    CO = float(input("Insira o valor de monóxido de carbono (CO): "))
    NO2 = float(input("Insira o valor de dióxido de nitrogênio (NO2): "))
    SO2 = float(input("Insira o valor de dióxido de enxofre (SO2): "))
    comando = (f"INSERT INTO Amostras (mp10, mp25, o3, co, no2, so2) VALUES ({MP10}, {MP25}, {O3}, {CO}, {NO2}, {SO2})")

    cursor.execute(comando)
    connection.commit()
    
    print('Amostras inseridas com sucesso')

    print('ID das amostras:')

    os.system('pause')
    os.system('cls')

def consultar_amostra():
    os.system('cls')
    print('2 - Consultar amostras por ID.\n')
    print('\n')

    id = int(input('Insira o ID da amostra: '))
    comando = (f"SELECT mp10, mp25, o3, co, no2, so2 FROM Amostras WHERE id = {id}")
    cursor.execute(comando)
    retorno = cursor.fetchone()
    os.system("cls")
    print(f"Valores da amostra {id}:")
    print('\n')
    print(f'Valor de MP10: {retorno[0]:.2f}')
    print(f'Valor de MP25: {retorno[1]:.2f}')
    print(f'Valor de O3: {retorno[2]:.2f}')
    print(f'Valor de CO: {retorno[3]:.2f}')
    print(f'Valor de NO2: {retorno[4]:.2f}')
    print(f'Valor de SO2: {retorno[5]:.2f}')
    print('\n')
    os.system("pause")
    os.system("cls")

def imprimir_media_poluente():
    os.system('cls')
    print('3 - Media das amostras.\n')
    
    cursor.execute("SELECT AVG(MP10), AVG(MP25), AVG(O3), AVG(CO), AVG(NO2), AVG(SO2) FROM AMOSTRAS")
    retorno = cursor.fetchone()
    print(f'Media de MP10: {retorno[0]:.2f}')
    print(f'Media de MP25: {retorno[1]:.2f}')
    print(f'Media de O3: {retorno[2]:.2f}')
    print(f'Media de CO: {retorno[3]:.2f}')
    print(f'Media de NO2: {retorno[4]:.2f}')
    print(f'Media de SO2: {retorno[5]:.2f}')
    print('\n')

    mainClass(retorno[0], retorno[1], retorno[2], retorno[3], retorno[4], retorno[5])

    os.system('pause')
    os.system("cls")

def imprimir_tabela_completa():
    os.system('cls')
    print('5 - Exibir tabela completa.\n')

    for row in cursor.execute("SELECT * FROM Amostras ORDER BY ID ASC"):
        print(f"ID:{row[0]}  MP10:{row[1]} --- MP25:{row[2]} --- O3:{row[3]} --- CO:{row[4]} --- NO2:{row[5]} --- SO2:{row[6]}")
    
    os.system('pause')
    os.system('cls')



while True:
    menu()