import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardListState, BoardState } from '../store/board/board.state';
import * as BoardActions from '../store/board/board.action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface AppState {
  todos: BoardListState;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public boardState$: Observable<BoardState[]>;
  constructor(private store: Store<BoardListState>, private router: Router) { }

  ngOnInit() {
    this.boardState$ = this.store.select(store => store.boards);
    this.store.dispatch(new BoardActions.GetBoards());
    // this.boardState$.subscribe(
    //   data => {
    //     console.log('data-' + JSON.stringify(data));
    //   }
    // )
  }

  public addBoard() {
    let boardName = prompt('Enter board name');
    if (boardName) {
      this.store.dispatch(new BoardActions.CreateBoard(boardName));
    }
  }
}
