import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { toDoInputModel } from '../models/toDoInputModel';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs'
import { User } from '../models/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private auth: AngularFireAuth,
    private router: Router) { }

  initialise() {
    this.auth.onAuthStateChanged((user) => {
      this.user$.next(user);
    });
  }

  async signInWithGoogle() {
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigateByUrl('/');
    }
    catch (e) {
      console.log(e);

    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigateByUrl('/');
    }
    catch (e) {
      console.log(e);

    }
  }

  async signUpWithEmail(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email,password);
      this.router.navigateByUrl('/');
    }
    catch (e) {
      console.log(e);
    }
  }

  signOut() {

  }
}
