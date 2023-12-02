import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { toDoInputModel } from '../models/toDoInputModel';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit {
  toDoCollection: AngularFirestoreCollection<toDoInputModel>;
  user: User | null = null;
  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.toDoCollection = afs.collection<toDoInputModel>("todos");
  }


  ngOnInit(): void {

    this.auth.user$.subscribe((user:User|null) => {
      this.user = user;
    })
  }

  addToDo(inputValue: string) {
    if (inputValue && this.user) {

      this.toDoCollection.add({
        isCompleted: false,
        userId: this.user.uid,
        title: inputValue
      });

    }

  }
}
