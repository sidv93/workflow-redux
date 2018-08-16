import { ListState, ListsState } from './list.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as ListActions from './list.action';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class ListEffects {
    constructor(private action$: Actions, private http: HttpClient, private apollo: Apollo) { }

    private getListsQuery = gql`
                    query lists($boardId: String!) {
                        lists(boardId: $boardId) {
                            listId
                            listName
                            boardId
                        }
                    }
                `;
    private createListMutation = gql`
                    mutation createList($listName: String!, $boardId: String!) {
                        createList(listName: $listName, boardId: $boardId) {
                            listId
                            listName
                            boardId
                        }
                    }
                `;
    private deleteListMutation = gql`
                    mutation deleteList($listId: String!) {
                        deleteList(listId: $listId) {
                            listId
                        }
                    }
    `;

    @Effect()
    GetLists$: Observable<Action> = this.action$
        .ofType<ListActions.GetLists>(ListActions.GET_LISTS)
        .pipe(
            switchMap(action => {
                return this.apollo.watchQuery({
                    query : this.getListsQuery,
                    variables : {
                        "boardId": action.payload.boardId.toString()
                    }
                }).valueChanges.pipe(
                    map(res => {
                        return new ListActions.GetListsSuccess(res.data['lists']);
                    })
                )
            }),
            catchError(
                () => of(new ListActions.GetListsError())
            )
        )
    
        @Effect()
        CreateList$: Observable<Action> = this.action$
            .ofType<ListActions.CreateList>(ListActions.CREATE_LIST)
            .pipe(
                switchMap(action => {
                    return this.apollo.mutate({
                        mutation: this.createListMutation,
                        variables : {
                            "boardId": action.payload.boardId,
                            "listName": action.payload.listName
                        }
                    }).pipe(
                        map(res => {
                            return new ListActions.CreateListSuccess(res.data['createList']);
                        })
                    )
                }),
                catchError(
                    () => of(new ListActions.CreateListError())
                )
            )

    @Effect()
    DeleteList$: Observable<Action> = this.action$
        .ofType<ListActions.DeleteList>(ListActions.DELETE_LIST)
        .pipe(
            switchMap(action => {
                console.log('delete list payload=' + JSON.stringify(action.payload));
                return this.apollo.mutate({
                    mutation: this.deleteListMutation,
                    variables: {
                        listId: action.payload.listId
                    }
                })
                .pipe(
                    map((res: Response) => {
                        console.log('delete list res-' + JSON.stringify(res));
                        return new ListActions.DeleteListSuccess(action.payload.listId);
                    })
                )
            }),
            catchError(
                () => of(new ListActions.DeleteListFailure())
            )
        )
}