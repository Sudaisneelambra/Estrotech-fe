import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InputComponent } from './components/shared/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/shared/button/button.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SecondNavComponent } from './components/shared/second-nav/second-nav.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    SecondNavComponent,
    CapitalizePipe
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
