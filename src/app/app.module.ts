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
import { DevicesComponent } from './pages/devices/devices.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { LineChartComponent } from './components/shared/line-chart/line-chart.component'
import { DataPercentComponent } from './components/shared/data-percent/data-percent.component';
import { DeviceAvailabeComponent } from './components/shared/device-availabe/device-availabe.component';
import { OfflineDeviceComponent } from './components/shared/offline-device/offline-device.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DeviceComponent } from './components/shared/device/device.component';
import { SinglePagesComponent } from './pages/single-pages/single-pages.component';
import { DeviceDetailsComponent } from './components/shared/device-details/device-details.component';
import { UpTimeDataComponent } from './components/shared/up-time-data/up-time-data.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, DevicesComponent, HomeComponent, SinglePagesComponent, UserHomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NavbarComponent,
    SecondNavComponent,
    CapitalizePipe,
    HttpClientModule,
    LineChartComponent,
    NotFoundComponent,
    DataPercentComponent,
    DeviceAvailabeComponent,
    OfflineDeviceComponent,
    DeviceComponent,
    DeviceDetailsComponent,
    UpTimeDataComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
