import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardListState, BoardState } from '../store/board/board.state';
import * as BoardActions from '../store/board/board.action';
import { Observable } from 'rxjs';

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
  constructor(private store: Store<BoardListState>, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.boardState$ = this.store.select(store => store.boards);
    this.store.dispatch(new BoardActions.GetBoards());
  }
}
