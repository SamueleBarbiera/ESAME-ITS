#import psycopg2
import requests as rq
import json
import pandas as pd
import numpy as np
import random as ran
import flask as fk
from datetime import datetime, timedelta
import time
import cuid



CLOUD = "https://parcheggio-iot.azure.app/" 

app = fk.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/posti', methods=['GET'])
def getPosti():
  conn = sqlite3.connect('Raspberry/ParkingTest.db')
  terra, primo = range(2)
  try:
    req = rq.get(f"{CLOUD}parcheggi/liberi",  headers={"Content-Type": "application/json"}, timeout = 2)
    if req.status_code == 200:
      json = req.json()
      print(json)
      return {"posti": {"0":json['piano1_TOT'], "1":json['piano2_TOT']}}
  except Exception as e:
    print(e)
    

@app.route('/check-in', methods=['POST'])
def checkIn():
  try:
    #utente entra con button
    if cancello['entrata'] == "button":
      req = rq.post(f"{CLOUD}btn/checkin", headers={"Content-Type": "application/json"},  timeout = 2)
      print(f"Check-in effettuato tramite bottone...")
      return {"trovato": True}
  except Exception as e:
    print(e)

#deve ritornare il costo totale del ticket
@app.route('/check-out', methods=['POST'])
def checkOut():
  try:
    ticket = range(1)
   if cancello['uscita'] == "button":
    req = rq.post(f"{CLOUD}btn/checkout", headers={"Content-Type": "application/json"},timeout = 2)
    return {"trovato": True}

  except Exception as e:
    print(e)
  

@app.route('/stato', methods=['POST'])
def postSensoriProssimita():
  sensor = fk.request.get_json()
  print(sensor)
  
  parking = list(sensor.keys())[0]
  posto = int(str(parking)[2:])
  piano = int(str(parking)[0:-2])+1

  try:
    if sensor[parking]['stato'] == True:
      req = rq.post(f"{CLOUD}parcheggi/checkin", headers={"Content-Type": "application/json"}, json={"posto":posto, "piano":piano})
    else:
      date = datetime.strptime(str(sensor[parking]['sosta']).replace('T',' ').replace('Z',''), '%Y-%m-%d %H:%M:%S') + timedelta(hours = 1)
      sosta = (datetime.now() - date).total_seconds()/60
      req = rq.post(f"{CLOUD}durata/create", headers={"Content-Type": "application/json"}, json={"posto" :posto, "piano": piano, "tempoGet": sosta }, timeout = 2)
      req = rq.post(f"{CLOUD}parcheggi/checkout", headers={"Content-Type": "application/json"}, json={"posto": posto, "piano": piano})

  except Exception as e:
    print(e)
    
  stato = range(1)
  if sensor[parking]['stato'] == True:
    stato = 1
  else:
    stato = 0
  
  if stato == 0:
    return f"Parcheggio {parking} libero"
  elif stato == 1:
    return f"Parcheggio {parking} occupato"

@app.errorhandler(404)
def page_not_found(e):
  return "<h1>404</h1><p>The resource could not be found.</p>", 404


if __name__ == "__main__":
  app.before_first_request(createTables)
  app.run(host='0.0.0.0', port=5000)

