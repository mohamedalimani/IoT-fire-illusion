//connecting to mqtt broker
const mqtt = require('mqtt') ; 
const host = 'broker.emqx.io' ;  
const mqttPort = '1883' ;
const clientId = 'client_interface' ;
const topic = 'esp8266/flame' ;
const connectUrl = `mqtt://${host}:${mqttPort}` ; 

const express = require('express') ;
const app = express() ;
const cors = require('cors')
var bodyParser = require('body-parser') ;

// TEST ME 
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
  cors:{origin:'*'}
}) ;

app.use(cors());
app.use(express.json())
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({
  extended:false 
})) ;

const client = mqtt.connect(connectUrl,{       // mqtt broker model & connection configuration
    clientId,
    clean:true,
    connectTimeout:4000,
    username:'mani',
    password:'mani',
    reconnectPeriod:1000,
}) ;

client.on('connect', () => {                      // connecting & subscribing to mqtt broker
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })

    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
io.on('connection',(socket)=>{  
client.on('message',(topic,payload)=>{                           // get data from mqtt broker using mqtt and emit that data to angular using websocket
    console.log('Received Message:',topic,payload.toString()) ;
    let x = payload.toString() ; 
    socket.emit('dataToClient',x) ;
  })
})
  
  http.listen(3001,()=>{
    console.log("port for sockets works fine") ;
  })