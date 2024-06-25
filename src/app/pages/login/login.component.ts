import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
  };


  name:string='sudais'

  buttonStyles = {
    'background-color': '#3b3379',
    'color': 'white',
    'font-weight': 'bold',
    'border-radius': '5px',
    'padding': '23px 30px',
    'font-size': '20px',
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (
      this.loginForm.email.trim() !== '' &&
      this.loginForm.password.trim() !== ''
    ) {
      this.router.navigate(['/home/dashboard']);
    } else {
      alert('fill the form');
    }
  }

  onEmailChange(event: string) {
    this.loginForm.email = event;
  }

  onPasswordChange(event: string) {
    this.loginForm.password = event;
  }
}
