#Lettura con raspberry
import RPi.GPIO as GPIO          #Pin generali

#Librerie generali
import signal
import time
import requests as r
import requests.exceptions

#VARIABILI
URL = "http://192.168.66.222:5000/" #Url base del server NODE
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

#PIN LED
RED = 29
GREEN = 31
YELLOW = 33

#PIN PULSANTI
BUTTONENTRATA = 3
BUTTONUSCITA = 5

#Variabili di controllo(Serve per mantenere sicura la simulazione)
pieno = False
chiuso = False
pulsanteEntrata = False
pulsanteUscita = False

#Imposto Pin di Input e Output
GPIO.setup(RED,GPIO.OUT)
GPIO.setup(GREEN,GPIO.OUT)
GPIO.setup(YELLOW,GPIO.OUT)
GPIO.setup(BUTTONENTRATA,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(BUTTONUSCITA,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

# Crea un oggetto json da inviare tramite richiesta Api Rest Post per registrare una nuova entrata
def NewEntryJSON():
        return {"entrata":"button","codice":""}

# Crea un oggetto json da inviare tramite richiesta Api Rest Post per registrare una nuova uscita
def NewExitJSON(exit, code):
    return {"uscita":exit, "codice": code}

# Restituisce il numero di posti parcheggio liberi totali
def getParcheggiLiberi():
    # chiamata Rest Api Get per ottenere i posti parcheggio liberi per piano(in caso di errore restituisce codice -1)
    try:
        response = r.get(url=URL+"posti", timeout=5)
    except(requests.exceptions.ConnectionError, requests.exceptions.Timeout):
        return -1
    except requests.exceptions.HTTPError :
        print("Errore Server")
        return -1
    else:
        # se va tutto bene dalla risposta mi ricavo un oggetto json con la struttura 
        # {"posti":{"0":postiLiberiPianoTerra,"1":postiLiberiPrimoPiano}} 
        # restituisce la somma dei posti liberi per piano
        responseJSON = response.json()
        return responseJSON["posti"]["0"]+responseJSON["posti"]["1"]

# impostazione del buzzer e del LED giallo in caso si verifica un'anomalia generale(errore di connessione o errore server)
def allarmeGenerico():
    doItFor = 3
    countBeepYellow = 0
    while countBeepYellow < doItFor:
        GPIO.output(YELLOW,1)
        time.sleep(0.500)
        GPIO.output(YELLOW,0)
        time.sleep(0.500)
        countBeepYellow += 1

# impostazione del buzzere e del LED verde in caso l'operazione corrente è andata a buon fine
def operazioneConclusa():
    GPIO.output(GREEN,1)
    time.sleep(0.500)
    GPIO.output(GREEN,0)


###CALLBACKS


#quando premo il pulsante di entrata
def buttonEntrata_callback(channel):
    global lcd, pulsanteEntrata, pulsanteUscita, pieno, chiuso
    
    # eseguo la funzione solo se il parcheggio è aperto, non risulta pieno o se non sono in esecuzione altre operazioni
    if pieno == False and pulsanteUscita == False and chiuso == False :
        pulsanteEntrata = True  # booleano di controllo che imposta l'operazione di entrata tramite pulsante attiva
        jsonObject = NewEntryJSON("")

        # eseguo richiesta post di check-in al server
        try:
            response = r.post(url=URL+"check-in",json=jsonObject,timeout=5)
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
            # in caso di errore di connessione al server o di timeout della richiesta
            print("SERVER NON RAGGIUNGIBILE")
            allarmeGenerico()
            
        except requests.exceptions.HTTPError :
            # in caso di errore interno del server
            print("Errore Server --> ERRORE RICEZIONE DATI")
            allarmeGenerico()
            
        else:
            # se tutto va bene
            print("RITIRO BIGLIETTO --> CANCELLO APERTO")
            operazioneConclusa()
            response.close()
        pulsanteEntrata=False

# quando premo il pulsante di uscita
def buttonUscita_callback(channel):
    global lcd, pulsanteUscita, pulsanteEntrata, chiuso
    
    # eseguo la funzione solo se il parcheggio risulta aperto e se non sono in esecuzione altre operazioni
    if pulsanteEntrata == False and chiuso == False :
        pulsanteUscita = True # booleano di controllo che imposta l'operazione di uscita tramite pulsante attiva
        jsonObject = NewExitJSON("button", "")

        # eseguo richiesta post di check-out al server
        try:
            response = r.post(url=URL+"check-out",json=jsonObject,timeout=5)
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
            # in caso di errore di connessione al server o di timeout della richiesta
            print("SERVER NON RAGGIUNGIBILE")
            allarmeGenerico()
        except requests.exceptions.HTTPError :
            # in caso di errore interno del server
            print("Errore Server")
            print("ERRORE RICEZIONE DATI")
            allarmeGenerico()
        else:
            # se tutto va bene
            responseJson = response.json()
            print("IMPORTO")
            print(responseJson["costo"]) # dalla risposta mi ricavo il costo del parcheggio
            print("PAGAMENTO EFFETTUATO")
            operazioneConclusa()
            print("ARRIVEDERCI E GRAZIE")
            response.close()
        pulsanteUscita = False

# quando da terminale premo ctrl+c(termino il programma)
def handlerCTRL(signum, frame):
    # resetto tutte le variabili interessate(spengo i LED)
    GPIO.output(RED,0)
    GPIO.output(GREEN,0)
    GPIO.output(YELLOW,0)
    exit(1)
 
# imposto i callback
signal.signal(signal.SIGINT, handlerCTRL)
GPIO.add_event_detect(BUTTONENTRATA,GPIO.RISING,callback=buttonEntrata_callback)
GPIO.add_event_detect(BUTTONUSCITA,GPIO.RISING,callback=buttonUscita_callback)

#ciclo infinito
while True:
    # imposto la variabile di controllo "chiuso" a False, spengo il LED rosso
    # e ottengo il numero di posti parcheggio liberi totali
    chiuso = False
    if GPIO.input(RED) == 1:
        GPIO.output(RED,0)
    parcheggiLiberi = getParcheggiLiberi()

    # se durante l'operazione per ottenere il numero di posti parcheggio liberi totali si verifica un errore
    # ottengo un codice -1 come risposta, dunque imposto il LED giallo e ricomincia un nuovo ciclo
    if parcheggiLiberi == -1:
        if GPIO.input(YELLOW) == 0:
            GPIO.output(YELLOW,1)
            print("SERVER NON RAGGIUNGIBILE")
    else:
        # se invece l'operazione per ottenere il numero di posti parcheggio liberi totali va a buon fine
        # spengo il LED giallo in caso di errori precedenti
        if GPIO.input(YELLOW) == 1:
            GPIO.output(YELLOW,0)

        # poi controllo se il numero di posti parcheggio liberi totali equivale a 0 vuol dire
        # che il parcheggio risulta pieno e imposto il LED rosso
        if parcheggiLiberi == 0:
            if GPIO.input(RED) == 0:
                print("PARCHEGGIO PIENO")
                GPIO.output(RED,1)
            pieno = True # booleano di controllo che indica il parcheggio chiuso
        else:
            # altrimenti il parcheggio risulta disponibile, quindi imposto la variabile di controllo "pieno" a False
            # e spengo il LED rosso(in caso nel precedente ciclo il parcheggio risultasse pieno) 
            pieno = False
            if GPIO.input(RED) == 1:
                GPIO.output(RED,0)
        
        # sfruttando le variabili di controllo imposto il display LCD rendendo il parcheggio disponibile
        if pieno == False and pulsanteEntrata == False and pulsanteUscita == False:
            print("PARCHEGGIO DISPONIBILE")
    
       
    time.sleep(1)