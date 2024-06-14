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
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { LineChartComponent } from './components/shared/line-chart/line-chart.component'



@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, SideBarComponent, DevicesComponent, HomeComponent, NotFoundComponent, LineChartComponent],
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
    CapitalizePipe,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
