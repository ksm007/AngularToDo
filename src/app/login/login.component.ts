import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
    if (this.email.value && this.password.value) {
      this.authService.signInWithEmail(this.email.value, this.password.value);
    }
  }
  logOut() {
    this.authService.signOut();
  }
  loginWithGoogle() {
      this.authService.signInWithGoogle();
  }
  signUp() {
    if (this.email.value && this.password.value) {
      this.authService.signUpWithEmail(this.email.value, this.password.value);
    }
  }
}
