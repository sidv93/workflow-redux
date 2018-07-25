import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ListActions from '../store/list/list.action';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListState, ListsState } from '../store/list/list.state';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  listState$: Observable<ListState[]>;

  constructor(private store: Store<ListsState>, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('in board component');
    let boardId = this.route.snapshot.paramMap.get('boardId');
    let boardName = this.route.snapshot.paramMap.get('boardName');
    this.listState$ = this.store.select(store => store.lists);
    this.store.dispatch(new ListActions.GetLists({ boardId: boardId, boardName: boardName }));
  }

  public addList() {
    console.log('in add list');
    let listName = prompt('Enter List name');
    if (listName) {
      this.store.dispatch(new ListActions.CreateList({
        boardId: this.route.snapshot.paramMap.get('boardId'),
        listName: listName
      }));
    }
  }

  public deleteBoard() {
    console.log('in delete board');
  }
}
