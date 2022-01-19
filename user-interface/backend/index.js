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

// sending alert email
var nodemailer = require('nodemailer') ;

var transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'dali.mani652@gmail.com',
    pass:'pfcgiktydjslymcl'
  }
}) ; 

var mailOptions = {
  from:'dali.mani652@gmail.com',
  to:'mohamedali.mani@esprit.tn',
  subject:'FIRE ALERT !',
  text:'sorry for bothering you but apparently your house is on fire ! good luck'
}


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

 // connecting & subscribing to mqtt broker
client.on('connect', () => {                     
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

// get data from mqtt broker using mqtt and emit that data to angular using websocket
io.on('connection',(socket)=>{  
client.on('message',(topic,payload)=>{  
    console.log('Received Message:',topic,payload.toString()) ;
    let x = payload.toString() ; 
    if (x=='1'){
      transporter.sendMail(mailOptions,function(error,info){
        if (error){
          console.log(error);
        }else{
          console.log('Email sent:' + info.response) ;
        }
      })
      const client = require('twilio')('ACcca839a314a9e300cc539b1c749870f6', '6c117a1a4e1733549a5c29edf32fd988');
      client.messages
        .create({
          to: '+21651591580',
          from: '+19362463988',
          body: 'BURN BABY BUUUUUUURN !',
        })
        .then(message => console.log(message.sid));
    }
    socket.emit('dataToClient',x) ;
  })
})

  http.listen(3001,()=>{
    console.log("port for sockets works fine") ;
  })