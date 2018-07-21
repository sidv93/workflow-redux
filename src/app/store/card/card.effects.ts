import { CardState, CardListState } from './card.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as CardActions from './card.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardEffects {
    constructor(private action$: Actions, private http: HttpClient) { }

    @Effect()
    GetCards$: Observable<Action> = this.action$
        .ofType<CardActions.GetCards>(CardActions.GET_CARDS)
        .pipe(
            switchMap(action => {
                return this.http.get('http://localhost:3000/api/v1/cards/1').pipe(
                    map((res: Response) => {
                        return new CardActions.GetCardsSuccess(res['data'] as CardState[]); 
                    })
                );
            }),
            catchError(
                () => of(new CardActions.GetCardsError())
            )
        );
}