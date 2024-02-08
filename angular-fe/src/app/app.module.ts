import { NgModule } from '@angular/core';
import { appConfig } from './app.config';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeModule } from './components/feature/home/home.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  providers: appConfig.providers,
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
