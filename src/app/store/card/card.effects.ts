import { CardState, CardListState } from './card.state';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as CardActions from './card.action';

@Injectable()
export class CardEffects {
    constructor(private action$: Actions) { }

    @Effect()
    GetCards$: Observable<Action> = this.action$
        .ofType<CardActions.GetCards>(CardActions.GET_CARDS)
        .switchMap(action => {
            console.log('in card effects');
            return action;
        });    
}