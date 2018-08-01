import { CardState, CardListState } from './card.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
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
            mergeMap(action => {
                return this.http.get('http://localhost:3000/api/v1/cards/' + action.payload).pipe(
                    map((res: Response) => {
                        return new CardActions.GetCardsSuccess(res['data'] as CardState[]); 
                    })
                );
            }),
            catchError(
                () => of(new CardActions.GetCardsError())
            )
        );
    
    @Effect()
    CreateCard$: Observable<Action> = this.action$
        .ofType<CardActions.CreateCard>(CardActions.CREATE_CARD)
        .pipe(
            switchMap(action => {
                return this.http.post('http://localhost:3000/api/v1/card', action.payload).pipe(
                    map((res: Response) => {
                        return new CardActions.CreateCardSuccess(new Array(res['data']) as CardState[]);
                    })
                )
            }),
            catchError(
                () => of(new CardActions.CreateCardError())
            )
        )

    @Effect()
    DeleteCard$: Observable<Action> = this.action$
        .ofType<CardActions.DeleteCard>(CardActions.DELETE_CARD)
        .pipe(
            switchMap(action => {
                return this.http.delete('http://localhost:3000/api/v1/card/' + action.payload.cardId).pipe(
                    map((res: Response) => {
                        return new CardActions.DeleteCardSuccess(action.payload.cardId);
                    })
                )
            }),
            catchError(
                () => of(new CardActions.DeleteCardFailure())
            )
        )

    @Effect()
    UpdateCard$: Observable<Action> = this.action$
        .ofType<CardActions.UpdateCard>(CardActions.UPDATE_CARD)
        .pipe(
            switchMap(action =>  {
                return this.http.put('http://localhost:3000/api/v1/card/' + action.payload.cardId, {cardData: action.payload.cardData}).pipe(
                    map((res: Response) => {
                        return new CardActions.UpdateCardSuccess(action.payload);
                    })
                )
            }),
            catchError(
                () => of(new CardActions.UpdateCardFailure())
            )
        )
}