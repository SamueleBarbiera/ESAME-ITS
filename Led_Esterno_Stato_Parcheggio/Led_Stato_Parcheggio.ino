#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>
#include <ArduinoJson.h>

// variabili per la connessione alla rete e al nostro server
const char *ssid = "TCPBerry_2.4";
const char *password = "Vmware1!";
String serverName = "http://192.168.66.222:5000/posti";

// variabili generiche di supporto
int lastTime;
int timerDelay;
int postiPianoTerra = 50;
int postiPianoUno = 50;
String dataString;

#define LED_RED 16
#define LED_YELLOW 17
#define LED_ORANGE 18
#define LED_GREEN 19

void setup()
{
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_ORANGE, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  lastTime = 0;
  timerDelay = 10000;
}

void loop()
{

  if ((millis() - lastTime) > timerDelay)
  {
    // Controllo stato connessione
    if (WiFi.status() == WL_CONNECTED)
    {

      dataString = httpGETRequest(serverName); // salvo risposta della chiamata get al server

      // la risposta ottenuta in formato stringa la converto in formato oggetto json
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, dataString);

      if (doc["ErrorCode"] != -1) // se va tutto bene e non ci sono errori aggiorno i valori di posti occupati
      {
        postiPianoTerra = int(doc["posti"]["0"]);
        postiPianoUno = int(doc["posti"]["1"]);

        Serial.println(postiPianoTerra);
        Serial.println(postiPianoUno);
      }

      // Nel caso si verificasse un errore ugualmente il led fa visualizzare gli
      // ultimi dati ricevuti

      // setto led per il parcheggio terra

      Serial.print("Piano 00:");
      if (postiPianoTerra == 0)
        digitalWrite(LED_RED, HIGH);
      else if (postiPianoTerra * 100 / 3 > 75 && postiPianoTerra * 100 / 3 < 99)
        Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_ORANGE, HIGH);
      else if (postiPianoTerra * 100 / 3 > 50 && postiPianoTerra * 100 / 3 < 74)
          Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_YELLOW, HIGH);
      else if (postiPianoTerra * 100 / 3 < 49)
          Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_GREEN, HIGH);

      // setto led per il parcheggio piano uno
      Serial.print("Piano 01:");
      if (postiPianoUno == 0)
        digitalWrite(LED_RED, HIGH);
      else if (postiPianoTerra * 100 / 3 > 75 && postiPianoTerra * 100 / 3 < 99)
        Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_ORANGE, HIGH);
      else if (postiPianoTerra * 100 / 3 > 50 && postiPianoTerra * 100 / 3 < 74)
          Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_YELLOW, HIGH);
      else if (postiPianoTerra * 100 / 3 < 49)
          Serial.print("Liberi: " + String(postiPianoTerra));
      digitalWrite(LED_GREEN, HIGH);
    }
  }
  else
  {
    Serial.print("Wifi not connected");
  }
  lastTime = millis();
}

// funzione che effettua la chiamata get al server
String httpGETRequest(String serverName)
{
  WiFiClient client;
  HTTPClient http;

  // richiedo connessione al server
  http.begin(client, serverName);

  // invio richiesta
  int httpResponseCode = http.GET();

  // risposta dal server
  String payload = "{}";

  // se va tutto bene
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // mi salvo la risposta
    payload = http.getString();
  }
  // altrimenti
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);

    // mi salvo ugualmente una risposta con un errorcode -1
    payload = "{\"ErrorCode\": -1}";
  }
  // Rilascio le risorse per la connessione
  http.end();

  // ritorno in formato stringa la risposta del server
  return payload;
}