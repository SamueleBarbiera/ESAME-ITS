#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define LED_FIRST = 15;
#define LED_SECOND = 16;
#define BTN_PARCHEGGIO1 = 17; // pin del sensore di pressione del parcheggio 1
// #define BTN_PARCHEGGIO11 = 3; // pin del sensore di pressione del parcheggio 2
// #define BTN_PARCHEGGIO11 = 4; // pin del sensore di pressione del parcheggio 3
#define buttonState = 0;     // stato attuale del sensore di pressione del parcheggio
#define lastButtonState = 0; // stato precedente del sensore di pressione del parcheggio
float countFirst, countSecond;
const char *ssid = "TCPBerry_2.4";
const char *password = "Vmware1!";
String ParcheggioUno = "0001";
String serverName = "http://192.168.66.222:5000/stato";
WiFiUDP ntpUDP;

void setup()
{
  pinMode(LED_FIRST, OUTPUT);
  pinMode(LED_SECOND, OUTPUT);
  pinMode(BTN_PARCHEGGIO1, INPUT);
  WiFi.begin(ssid, password);

  Serial.begin(9600); // // Serial Communication is starting with 9600 of baudrate speed
  Serial.println("Application start...");
}

void ResponceCode(int httpResponseCode)
{
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
}

void sensorPost(String json, String path)
{
  HTTPClient http;

  http.begin(path);
  http.addHeader("Content-Type", "application/json");
  // Serial.println(json);
  int httpResponseCode = http.POST(json);
  ResponceCode(httpResponseCode);
  String response = http.getString();
  Serial.println(httpResponseCode);
  Serial.println(response);
  http.end();
}

void sendJson(int n, bool stato)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    StaticJsonDocument<256> doc;
    if (n == 0)
    {
      // sensore 0
      JsonObject sensore_0 = doc.createNestedObject(String(ParcheggioUno));
      sensore_0["stato"] = stato;
    }
    String json;
    serializeJson(doc, json);
    sensorPost(json, serverName);
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
}

void loop()
{
  buttonState = digitalRead(BTN_PARCHEGGIO1);

  // compara lo stato precedente con lo stato attuale
  if (buttonState != lastButtonState)
  {
    // controlla lo stato del sensore dip pressione
    if (buttonState == HIGH)
    {
      Serial.println("Parcheggio occupato");
    }
    else
    {
      Serial.println("Parcheggio libero");
    }
    delay(50);
  }

  // salva lo stato attuale
  lastButtonState = buttonState;

  if (BTN_PARCHEGGIO1 == HIGH)
  {
    digitalWrite(LED_FIRST, HIGH);
    sendJson(0, true);
  }
  else
  {
    if (countFirst == true)
    {
      digitalWrite(LED_FIRST, LOW);
      sendJson(0, false);
    }
  }
}