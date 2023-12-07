import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { toDoInputModel } from '../models/toDoInputModel';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';

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
  user: User | null = null;
  activeFilter: BehaviorSubject<FilterState> = new BehaviorSubject<FilterState>(FilterState.All);
  isSmallScreen: boolean;

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService, private breakpointObserver: BreakpointObserver) {

    this.authService.user$.subscribe((user: User | null) => {
    
      if (user) {
        this.user = user;
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
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 375px)');
  }
  ngOnInit(): void {
  }

  isFilterActive(filterState:FilterState){
    return this.activeFilter.getValue() === filterState;
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
    if(this.user&& this.items$){
      this.fireStore.collection<toDoInputModel>("todos", ref => ref
      .where('userId', '==', this.user?.uid)
      .where('isCompleted', '==',true))
      .get()
      .pipe( 
        map((qs: QuerySnapshot<toDoInputModel>) =>{
          return qs.docs;
        })
        )
      .subscribe((documents: QueryDocumentSnapshot<toDoInputModel>[]) =>{
        documents.forEach( (document:QueryDocumentSnapshot<toDoInputModel>) =>{
          document.ref.delete();
        });
      });
    }
  }

  setAsCompleted(item: toDoInputModel) {
    const toDoDoc = this.fireStore.doc(`todos/${item.id}`);
    toDoDoc.update({
      isCompleted: true
    });
  }

  deleteSingleItem(item:toDoInputModel){
    const toDoDoc = this.fireStore.doc(`todos/${item.id}`);
    toDoDoc.delete();
  }
}
