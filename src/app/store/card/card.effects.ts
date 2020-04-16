import { CardState, CardListState } from './card.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as CardActions from './card.action';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class CardEffects {
    constructor(private action$: Actions, private http: HttpClient, private apollo: Apollo) { }
    private getCardQuery = gql`
        query cards($listId: String!) {
            cards(listId: $listId) {
                cardData
                cardId
                listId
            }
        }`;
    private createCardMutation = gql`
        mutation createCard($cardData: String!, $listId: String!) {
            createCard(cardData: $cardData, listId: $listId) {
                cardId
                cardData
                listId
            }
        }
    `;
    private deleteCardMutation = gql`
        mutation deleteCard($cardId: String) {
            deleteCard(cardId: $cardId) {
                cardId
            }
        }
    `;
    private updateCardMutation = gql`
        mutation updateCard($cardId: String!, $cardData: String!) {
            updateCard(cardId: $cardId, cardData: $cardData) {
                cardId
                cardData
                listId
            }
        }
    `;

    @Effect()
    GetCards$: Observable<Action> = this.action$
        .ofType<CardActions.GetCards>(CardActions.GET_CARDS)
        .pipe(
            switchMap(action => {
                return this.apollo.watchQuery({
                    query: this.getCardQuery,
                    variables : {
                        "listId": action.payload
                    }
                }).valueChanges.pipe(map(res => {
                    return new CardActions.GetCardsSuccess(res.data['cards']);
                }))
            }),
            catchError(
                () => of(new CardActions.GetCardsError())
            )
        )
    
    @Effect()
    CreateCard$: Observable<Action> = this.action$
        .ofType<CardActions.CreateCard>(CardActions.CREATE_CARD)
        .pipe(
            switchMap(action => {
                console.log('create card payload-' + JSON.stringify(action.payload));
                return this.apollo.mutate({
                    mutation: this.createCardMutation,
                    variables: {
                        cardData: action.payload.cardData,
                        listId: action.payload.listId
                    }
                }).pipe(
                    map(res=> {
                        console.log('create card res=' + JSON.stringify(res));
                        return new CardActions.CreateCardSuccess(res.data['createCard']);
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
                console.log('delete card payload-' + JSON.stringify(action.payload));
                return this.apollo.mutate({
                    mutation: this.deleteCardMutation,
                    variables: {
                        cardId: action.payload.cardId
                    }
                }).pipe(
                    map(res => {
                        console.log('card delete response=' + JSON.stringify(res));
                        return new CardActions.DeleteCardSuccess({});
                    })
                )
            }),
            catchError(
                () => of(new CardActions.DeleteCardFailure())
            )
        )

    @Effect()
    UpdateCard$:Observable<Action> = this.action$
        .ofType<CardActions.UpdateCard>(CardActions.UPDATE_CARD)
        .pipe(
            switchMap(action => {
                console.log('payload= '+JSON.stringify(action.payload));
                return this.apollo.mutate({
                    mutation: this.updateCardMutation,
                    variables: {
                        cardId: action.payload.cardId,
                        cardData: action.payload.cardData
                    }
                }).pipe(
                    map(res => {
                        console.log('update card response-' + JSON.stringify(res));
                        return new CardActions.UpdateCardSuccess({});
                    })
                )
            }),
            catchError(
                () => of(new CardActions.UpdateCardFailure())
            )
        )
}