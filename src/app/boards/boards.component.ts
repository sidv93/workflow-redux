import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardState, BoardListState } from '../store/board/board.state';
import * as BoardActions from '../store/board/board.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  boardState$: Observable<BoardState[]>;

  constructor(private store: Store<BoardListState>) { }

  ngOnInit() {
    this.boardState$ = this.store.select(state => state.boards);
    this.store.dispatch(new BoardActions.GetBoards());
    this.boardState$.subscribe(
      data => {
        console.log('board state data-' + JSON.stringify(data));
      }
    )
  }

}
