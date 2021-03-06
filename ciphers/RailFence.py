

def encryptRailFence(text, key):

    rows = (key)
    columns = len(text)
    encrypted = []
    matrix = [[" " for i in range(columns)]
              for j in range(rows)]

    down = 0
    row = 0
    col = 0



    for i in range(columns):

        #zmiana kierunku poruszania sie jesli wiersz jest tym skrajnym

        if (row == 0) or (row == rows - 1):
            if(down==0):
                down=1
            elif(down==1):
                down=0
        #zapisanie litery do tabelki
        matrix[row][col] = text[i]
        col += 1
        #sprawdzenie czy mozna isc dalej w dol
        if (down==1):
            row += 1
        elif(down==0):
            row -= 1
        #zapisanie do wyniku
    for i in range(rows):
        for j in range(columns):
            if matrix[i][j] != ' ':
                encrypted.append(matrix[i][j])
    return (''.join(encrypted))


def decryptRailFence(text, key):



    rows = (key)
    columns = len(text)
    row = 0
    col = 0
    decrypted = []
    matrix = [[" "  for i in range(len(text))]
            for j in range(key)]
    down = 0

    for i in range(len(text)):
        if (row == 0):
            down = 1
        if (row == rows - 1):
            down = 0
        #wypełnienie tabelki gwiazdkami tam gdzie będą litery
        matrix[row][col] = '*'
        col += 1

        if (down==1):
            row += 1
        elif(down==0):
            row -= 1

    index = 0
    #wpisanie liter do tabeli
    for i in range(rows):
        for j in range(columns):
            if ((matrix[i][j] == '*') and
                    (index < columns)):
                matrix[i][j] = text[index]
                index += 1


    row=0
    col=0
    for i in range(columns):

        if (row == 0):
            down = 1
        if (row == key - 1):
            down = 0

        if (matrix[row][col] != '*'):
            decrypted.append(matrix[row][col])
            col += 1

        if (down==1):
            row += 1
        elif(down==0):
            row -= 1
    return ("".join(decrypted))


if __name__ == "__main__":
    print(encryptRailFence("szymonsarosiek", 3))

    print(decryptRailFence("sorezmnaoikyss", 3))