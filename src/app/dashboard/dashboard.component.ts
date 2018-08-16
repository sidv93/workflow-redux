import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardListState, BoardState } from '../store/board/board.state';
import * as BoardActions from '../store/board/board.action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '../store/auth/auth.state';
import { take } from '../../../node_modules/rxjs/operators';

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
  constructor(private boardStore: Store<BoardListState>, private router: Router,
    private authStore: Store<AuthState>) { }

  ngOnInit() {
    this.boardState$ = this.boardStore.select(store => store.boards);
    this.authStore.select(store => store).pipe(take(1)).subscribe(val => {
      this.boardStore.dispatch(new BoardActions.GetBoards({userId: val['auth'].username}));
    });
  }

  public addBoard() {
    let boardName = prompt('Enter board name');
    if (boardName) {
      this.boardStore.dispatch(new BoardActions.CreateBoard(boardName));
    }
  }

  public deleteBoard(boardId:string) {
    this.boardStore.dispatch(new BoardActions.DeleteBoard({
      boardId: boardId
    }));
  }
}
