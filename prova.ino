#include <WiFi.h>
#include <MQTT.h>

const char *ssid = "Vodafone-23470597";
const char *password = "t3sztdhib3zxk6e";
const char *clientID = "mqtt_samuel";

WiFiClient net;
MQTTClient mqtt;

int lastTime;
int timerDelay;

void connect()
{
    Serial.print("checking wifi...");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(1000);
    }

    Serial.print("\nconnecting...");
    while (!mqtt.connect(clientID))
    {
        Serial.print(".");
        delay(1000);
    }

    Serial.println("\nconnected!");

    mqtt.subscribe("/otherHello", 1);
    // client.unsubscribe("/hello");
}

void messageReceived(String &topic, String &payload)
{
    Serial.println("incoming: " + topic + " - " + payload);

    // Note: Do not use the client in the callback to publish, subscribe or
    // unsubscribe as it may cause deadlocks when other things arrive while
    // sending and receiving acknowledgments. Instead, change a global variable,
    // or push to a queue and handle it in the loop after calling `client.loop()`.
}

void setup()
{
    Serial.begin(9600);
    WiFi.begin(ssid, password);
    lastTime = 0;
    timerDelay = 5000;

    mqtt.begin("192.168.1.4", net);
    mqtt.setCleanSession(false);
    mqtt.onMessage(messageReceived);
    connect();
}

void loop()
{
    mqtt.loop();

    if (!mqtt.connected())
    {
        connect();
    }

    // publish a message roughly every second.
    if (millis() - lastTime > 1000)
    {
        lastTime = millis();
        mqtt.publish("/hello", "world", false, 1);
    }
}