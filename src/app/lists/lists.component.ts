import { Component, OnInit, Input } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { CardListState, CardState } from '../store/card/card.state';
import { Observable } from '../../../node_modules/rxjs';
import * as CardActions from '../store/card/card.action';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  @Input() list;
  public cardState$: Observable<CardState[]>;
  constructor(private store: Store<CardListState>) { }

  ngOnInit() {
    console.log('lists received =' + JSON.stringify(this.list));
    this.cardState$ = this.store.select(store => store.cards);
    this.store.dispatch(new CardActions.GetCards(this.list.listId));
  }

}
