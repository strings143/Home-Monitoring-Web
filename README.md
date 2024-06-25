# 開關燈和溫溼度監控
透過LED和溫溼度感測器，結合NodeMcu的WiFi功能的微控制器，達到簡易的遠端開關燈和溫溼度檢測。
# 預覽畫面
![image](https://github.com/strings143/Home-Monitoring-Web/assets/73727207/e41fc3e8-63e3-42e5-bacf-f2bcd46a3dd6)
### 開關燈 : 
* ![image](https://github.com/strings143/Home-Monitoring-Web/assets/73727207/63daf340-3325-43e9-8e44-ab3e1c2cd427)
### 溫溼度 :
* ![image](https://github.com/strings143/Home-Monitoring-Web/assets/73727207/d927bba8-5b20-420f-adcc-244deafb728e)

# 建置作業
* **感測器**: **DHT11 、LED**
* **WiFi模組**: **NodeMCU**
* **Arduino IDE 開關燈程式碼** : 
```
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Arduino_JSON.h>
const char* ssid = "帳號";
const char* password = "密碼";
const char* serverName = "連線Server";
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;
String sensorReadings;
float sensorReadingsArr[3];
void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
  // 將輸出變數初始化
   pinMode(D0, OUTPUT);
   digitalWrite(D0, LOW);
    pinMode(D1, OUTPUT);
   digitalWrite(D0, LOW);
    pinMode(D2, OUTPUT);
   digitalWrite(D0, LOW);
}
void loop() {
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status()== WL_CONNECTED){       
      sensorReadings = httpGETRequest(serverName);
      Serial.println(sensorReadings);
      JSONVar myObject = JSON.parse(sensorReadings);
      if (JSON.typeof(myObject) == "undefined") {
        Serial.println("Parsing input failed!");
        return;
      }
      Serial.print("JSON object = ");
      Serial.println(myObject);
       String state[3],menber[3];
       for (int i = 0; i < myObject.length(); i++) {
       JSONVar value = myObject[i];
        Serial.println(JSON.typeof(value));
        Serial.print("myObject[");
        Serial.print(i);
        Serial.print("] = ");
        Serial.println(value);
        Serial.println();
        state[i]=JSON.stringify(value["bulb"]);
        menber[i]=JSON.stringify(value["menber"]);
        Serial.print(state[i]);
        Serial.print("=");
        Serial.println(menber[i]);
     }
      
     if(menber[0]=="\"bulb1\"")
      {if(state[0]=="\"open\"")
      {
         digitalWrite(D0, HIGH);
         Serial.println("light open");
       }
      else{
        digitalWrite(D0, LOW);
        Serial.println("light close");
      }}
     
      if( menber[1]=="\"bulb2\""){
        if(state[1]=="\"open\"")
      {
         digitalWrite(D1, HIGH);
         Serial.println("light open");
       }
      else{
        digitalWrite(D1, LOW);
        Serial.println("light close");
      }
        }
        delay(500);
      if( menber[2]=="\"bulb3\""){
        if(state[2]=="\"open\"")
      {
         digitalWrite(D2, HIGH);
         Serial.println("light open");
       }
      else{
        digitalWrite(D2, LOW);
        Serial.println("light close");
      }
        }
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
String httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http; 
  http.begin(client, serverName);
  int httpResponseCode = http.GET();
  String payload = "{}"; 
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return payload;
}
```
* **Arduino IDE 溫溼度程式碼** : 
```
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"
#define dhtPin D1    //讀取DHT11 Data
#define dhtType DHT11 //選用DHT11 
DHT dht(dhtPin, dhtType); // Initialize DHT sensor
const char* ssid="帳號";
const char* password="密碼";
String url="連線Server" ;
int sensorValue=0;
void setup() 
{
  Serial.begin(9600);
  WiFi.begin(ssid,password);
  Serial.println("Connecting...");
  Serial.print("WiFi ssid : ");
  Serial.print(ssid);
  Serial.print("WiFi password : ");
  Serial.println(password);
  while(WiFi.status()!= WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  dht.begin();//啟動DHT
  delay(500); 
}
void loop() 
{ 
  String data="";
  double Temperature=0,Humidity=0;
  Temperature=dht.readTemperature();//讀取攝氏溫度
  Serial.print("Temperature = ");
  Serial.println(Temperature);
  Humidity= dht.readHumidity();//讀取濕度
  Serial.print("Humidity = ");
  Serial.println(Humidity);
  HTTPClient http; 
  String tmp = url+"?temperature="+Temperature+"&humidity="+Humidity;
  http.begin(tmp);
  int httpCode = http.GET();
  if(httpCode>0)
  {
       String payload = http.getString();
       Serial.println(httpCode);
       Serial.println(payload);
       Serial.println(tmp);
       delay(1000);
  }
  else
  {
       Serial.println("Error on HTTP request");        
  }
  http.end();
  delay(500);
}

```
# 流程圖
![](https://i.imgur.com/Q7tIY5V.png)
![image](https://github.com/strings143/IOT-web-open-light-and-Temperature-humidity/assets/73727207/be764c7f-f79a-4cf3-9d14-dc085351dbad)
# 安裝環境
* Arduino ide
* XAMPP



