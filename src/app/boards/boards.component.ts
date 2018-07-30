import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ListActions from '../store/list/list.action';
import * as BoardActions from '../store/board/board.action';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListState, ListsState } from '../store/list/list.state';
import { BoardListState, BoardState } from '../store/board/board.state';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  listState$: Observable<ListState[]>;
  boardState$: Observable<BoardState[]>;
  @Input() addCard;

  constructor(private listStore: Store<ListsState>, 
    private boardStore: Store<BoardListState>,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let boardId = this.route.snapshot.paramMap.get('boardId');
    let boardName = this.route.snapshot.paramMap.get('boardName');
    this.boardState$ = this.boardStore.select(store => store.boards);
    this.listState$ = this.listStore.select(store => store.lists);
    this.listStore.dispatch(new ListActions.GetLists({ boardId: boardId, boardName: boardName }));
  }

  public addList() {
    let listName = prompt('Enter List name');
    if (listName) {
      this.listStore.dispatch(new ListActions.CreateList({
        boardId: this.route.snapshot.paramMap.get('boardId'),
        listName: listName
      }));
    }
  }

  public addCards (e: any) {
    console.log('e=' + e);
  }

  public deleteBoard() {
    this.boardStore.dispatch(new BoardActions.DeleteBoard(
      {
        boardId: this.route.snapshot.paramMap.get('boardId')
      }
    ));
  }
}
