import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone:true,
  inputs:[],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router:Router) {}

  gotoEstroWebpage(){
    window.location.href = 'https://www.estrotech.in';
  }
}
