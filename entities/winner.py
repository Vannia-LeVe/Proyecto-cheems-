from persistence.db import get_connection


class Winner:

    def __init__(self, id, name, email, phrase, intentos, fecha_hora):
        self.id = id
        self.name = name
        self.email = email
        self.phrase=phrase
        self.intentos= intentos
        self.fecha_hora= fecha_hora
        
       #se hace la conexión  
    def save(self):
        try:
            connection = get_connection()
            cursor = connection.cursor()
            
        #fecha y hora en la que gano el usuario
        #consulta parametrizada
            query = "INSERT INTO winners (name, email, phrase, intentos) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (self.name, self.email, self.phrase, self.intentos))
            connection.commit()
            self.id = cursor.lastrowid
            return self.id
        except Exception as ex: 
            print("Error al guardar registro: ", ex)
            return 0
        finally:
            cursor.close()
            connection.close()
        
    @classmethod    
    def get_all(cls): 
        #función llamada directamente de la clase
        winners=[]
        try:
            connection = get_connection()
            cursor = connection.cursor()
            
            query = "SELECT id, name, email, phrase, intentos, fecha_hora FROM winners" #ORDER BY 
            cursor.execute(query)
            #va,os a obtener todos los resultados del query
            rows = cursor.fetchall()# obtener o buscar
            
            for row in rows:
                winner = cls(id =row[0] , name = row[1], email= row[2], phrase= row[3], intentos=row[4], fecha_hora=row[5] )
                winners.append(winner)
                
            return winners
        except Exception as ex: 
            print("Error al obtener registros: ", ex)
            return []
        finally:
            cursor.close()
            connection.close()
            