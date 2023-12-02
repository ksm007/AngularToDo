import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { toDoInputModel } from '../models/toDoInputModel';

enum FilterState {
  All = 'All',
  Active = 'Acitve',
  Completed = 'Completed'
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  items$!: Observable<any[]>;
  filteredToDos$!: Observable<any[]>;
  totalItemsLeft?: number;
  FilterState = FilterState;
  activeFilter: BehaviorSubject<FilterState> = new BehaviorSubject<FilterState>(FilterState.All);

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService) {
    this.authService.user$.subscribe((user: User | null) => {
      if (user) {
        this.items$ = this.fireStore.collection("todos", ref => ref.where('userId', '==', user.uid))
          .valueChanges({ idField: 'id' });
        this.items$.pipe(
          map((items: toDoInputModel[]) => items.filter(item => !item.isCompleted).length)
        ).subscribe((activeItems: number) => {
          this.totalItemsLeft = activeItems;
        });
        this.getToDos();
      }
    });
  }
  ngOnInit(): void {
  }

  getToDos() {
    if (!this.items$)
      return;
    this.filteredToDos$ = combineLatest(this.items$, this.activeFilter)
      .pipe(
        map(([todos, currentFilter]: [toDoInputModel[], FilterState]) => {
          if (currentFilter === FilterState.All) { return todos; }
          return todos.filter((toDo: toDoInputModel) => {
            const filterCondition = currentFilter === FilterState.Completed ? true : false;
            return toDo.isCompleted === filterCondition;
          });
        })
      )
  }
  setFilterState(filterState: FilterState) {
    this.activeFilter.next(filterState);
  }
  clearCompleted() {

  }

  setAsCompleted(item: toDoInputModel) {
    const toDoDoc = this.fireStore.doc(`todos/${item.id}`);
    toDoDoc.update({
      isCompleted: true
    });
  }
}
