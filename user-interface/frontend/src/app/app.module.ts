import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FlamePaintComponent } from './flame-paint/flame-paint.component';
import { HttpClientModule  } from '@angular/common/http';
import { IoserviceService } from './ioservice.service';

@NgModule({
  declarations: [
    AppComponent,
    FlamePaintComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [IoserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
