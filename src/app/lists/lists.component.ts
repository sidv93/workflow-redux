import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Store } from '../../../node_modules/@ngrx/store';
import { CardListState, CardState } from '../store/card/card.state';
import { Observable } from '../../../node_modules/rxjs';
import * as CardActions from '../store/card/card.action';
import * as ListActions from '../store/list/list.action';
import { ListsState, ListState } from '../store/list/list.state';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  @Input() list;
  public cardState$: Observable<CardState[]>;
  public listsState$: Observable<ListState[]>;
  constructor(private cardStore: Store<CardListState>,
    private listStore: Store<ListsState>, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cardState$ = this.cardStore.select(store => store.cards);
    this.cardStore.dispatch(new CardActions.GetCards(this.list.listId));
    this.listsState$ = this.listStore.select(store => store.lists);
  }

  public addCards() {
    let cardData = prompt('Enter card data');
    if (cardData) {
      this.cardStore.dispatch(new CardActions.CreateCard(
        {
          listId: this.list.listId,
          cardData: cardData
        }
      ));
    }
  }

  public deleteList() {
    this.listStore.dispatch(new ListActions.DeleteList({
      listId: this.list.listId
    }));
  }

  public deleteCard(e: any) {
    this.cardStore.dispatch(new CardActions.DeleteCard({
      cardId: e
    }))
  }

  public updateCards(e: any) {
    console.log('e=' + JSON.stringify(e));
    this.cardStore.dispatch(new CardActions.UpdateCard(
      {
        cardId: e.cardId,
        cardData: e.cardData
      }
    ))
  }

}
