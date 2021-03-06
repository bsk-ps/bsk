
import math



def encryptColumnar(word,key):
    alphabet="abcdefghijklmnopqrstuvwxyz"

    init=0
    #lista kolejności w jakiej będziemy zapisywać kolumny
    num_list = list(range(len(key)))
    #ustalenie kolejności alfabetycznej liter w kluczu
    for i in range(len(alphabet)):
        for j in range(len(key)):
            if alphabet[i]==key[j]:
                init+=1
                num_list[j]=init
    encrypted = ""
    columns = len(key)
    rows = int(math.ceil(len(word.rstrip()) / columns))
    index_key = 0
    list_key = sorted(list(key))
    list_word = list(word.rstrip())

    #wypełnienie pustymi miejscami pozostałego wiersza
    empty = int((rows * columns) - float(len(word.rstrip())))
    list_word.extend(" " * empty)
    matrix = [[" " for x in range(columns)] for y in range(rows)]

    #wpisanie liter do macierzy po kolei
    a=0
    for i in range (rows):
      for j in range (columns):
          matrix[i][j] = list_word[a]

          a+=1
    #uzupełnienie słownika który zawiera pary kolejność: kolumna
    dict1 = {}
    for a in range (columns):
        dict1[num_list[a]] = [matrix[0][a], matrix[1][a]]
    #dopisywanie do wyniku posortowanych wartości ze słownika kolumn
    for key, values in sorted(dict1.items()):
        encrypted+=''.join(values)
        index_key += 1

    return encrypted.replace(" ","")


def decryptColumnar(word, key):
    matrix = ""
    init=0
    num_list = list(range(len(key)))

    alphabet = "abcdefghijklmnopqrstuvwxyz"
    # ustalenie kolejności alfabetycznej liter w kluczu
    for i in range(len(alphabet)):
        for j in range(len(key)):
            if alphabet[i] == key[j]:
                init += 1
                num_list[j] = init



    columns = len(key)

    rows = int(math.ceil(len(word.rstrip()) / columns))

    #przepisanie kolejności liter na stringa
    num_loc=""
    for i in range (columns+1):
        for j in range(columns):
            if(num_list[j]==i):
                num_loc+=str(j)


    matrix = [[" " for x in range(columns)] for y in range(rows)]
    decrypted=""
    k=0
    it=0
    for i in range(len(word)):
        d=0
        if k== columns:
            k=0
        else:
            #wzięcie odpowiedniej kolejności kolumn
            d: int= int(num_loc[k])
        for j in range(rows):
            matrix[j][d] = word[it]
            #kontrolowanie czy doszliśmy do końca słowa
            it+=1
        if it == len(word):
            break
            #przejście do kolejnej kolumny
        k+=1

        #dopisanie do słowa kolejnych warotści macierzy po koleis
    for i in range(rows):
        for j in range (columns):
            decrypted+= str(matrix[i][j])


    return decrypted





#f = open("data.txt", "r")
#for line in f:
if __name__ == "__main__":
  print(encryptColumnar("sarosiek", "acrb"))
  print(decryptColumnar("ssokaire","acrb"))
