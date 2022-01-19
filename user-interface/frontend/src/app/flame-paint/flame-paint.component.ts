import { Component, OnInit } from '@angular/core';
import { IoserviceService } from '../ioservice.service';

@Component({
  selector: 'app-flame-paint',
  templateUrl: './flame-paint.component.html',
  styleUrls: ['./flame-paint.component.css']
})
export class FlamePaintComponent implements OnInit {
  
  sensorValue:any = '0' ; 
  audio = new Audio();
  constructor(private ioService:IoserviceService) {}

  ngOnInit(){
    this.playAudio() ;
    this.ioService.onNewStat().subscribe(msg=>{
      console.log('got a msg:'+msg) ;
      this.sensorValue = msg ; 
      this.playAudio() ; 
    })
  }
  playAudio(){
    this.audio.src = "../../../assets/audio/"+this.sensorValue+".wav";
    this.audio.load();
    this.audio.loop = true ;
    this.audio.play() ;   
  }
}