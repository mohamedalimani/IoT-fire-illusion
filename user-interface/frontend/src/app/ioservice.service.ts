import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class IoserviceService {

private socket: Socket ;

  constructor() { 
    this.socket = io('http://localhost:3001') ;
  }

  public onNewStat(){                       // get data from node.js using websockets
    return new Observable(observer=>{
      this.socket.on('dataToClient',msg=>{                   
        observer.next(msg) ;
      })
    })
  }
}
