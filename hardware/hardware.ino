int flameSensor = 5 ; //D1 pin in esp8266 card
#include <PubSubClient.h>
#include <ESP8266WiFi.h>

//i'm using mosquitto as the MQTT BROKER 

//WiFi Credentials 

const char *ssid = "TT_4A58" ;
const char *password = "ucqefd64y7" ; 

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io" ;
const char *topic = "esp8266/flame" ; 
const char *mqtt_username = "mani" ;
const char *mqtt_password = "mani" ;  
const int mqtt_port = 1883 ;
const char *client_id = "hardware-client"  ;

boolean preFlame = false ; // catches the previous state of the flame 

WiFiClient espClient ; 
PubSubClient client(espClient) ; 

void setup() {
Serial.begin(9600) ; 
pinMode(flameSensor,INPUT) ;
WiFi.begin(ssid,password) ; 
while(WiFi.status() != WL_CONNECTED){
  delay(500) ; 
  Serial.println("connecting to WiFi ...") ; 
} 
Serial.println("you're now connected to WiFi") ; 
//connecting to a MQTT BROKER
client.setServer(mqtt_broker,mqtt_port) ; 
while(!client.connected()){
Serial.println("connecting to mqtt broker ...") ; 
if (client.connect(client_id,mqtt_username,mqtt_password)){
  Serial.println("mqtt broker connected");
} else{
  Serial.print("falied with state") ; 
  Serial.print(client.state()) ; 
  delay(2000) ; 
}
}
client.publish(topic,"hello MQTT broker") ; 
}

void loop() {
  client.loop() ;
  sendStatus(flameSensor,topic) ;
}

void sendStatus(int sensor_pin,const char *topic){ 
   boolean flame = digitalRead(sensor_pin) ;
   const char *msg = flame ? "0" : "1" ; // 0: no flame detected | 1 flame detected
   if (flame != preFlame){
   client.publish(topic,msg) ;
   Serial.println(msg) ; 
   }
   else {
     Serial.println("no status change detected") ;
   }
   preFlame = flame ; 
}




