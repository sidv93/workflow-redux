import { BoardState, BoardListState } from './board.state';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, debounceTime, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as BoardActions from './board.action';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../../../node_modules/@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class BoardEffects {
    constructor(private action$: Actions, private http: HttpClient, private location: Location, private apollo: Apollo) { }

    private getBoardsQuery = gql`
                            query boards($user: String!) {
                                boards(user: $user) {
                                    boardName
                                    boardId
                                    user
                                }
                            }
                        `;
    private createBoardsMutation = gql`
                            mutation createBoard($boardName: String!, $user: String!) {
                                createBoard(boardName: $boardName, user: $user) {
                                    boardName
                                    boardId
                                    user
                                }
                                
                            }
                            `;      
    private deleteBoardMutation = gql`
                            mutation deleteBoard($boardId: String!) {
                                deleteBoard(boardId: $boardId) {
                                    boardId
                                }
                            }
                        `;
    @Effect()
    GetBoards$: Observable<Action> = this.action$
        .ofType<BoardActions.GetBoards>(BoardActions.GET_BOARDS)
        .pipe(
            switchMap(action => {
                return this.apollo.watchQuery({
                    query: this.getBoardsQuery,
                    variables: {
                        "user": action.payload.userId
                    }
                }).valueChanges.pipe(
                    map(res => {
                        return new BoardActions.GetBoardsSuccess(res.data['boards']);
                    })
                )
            }),
            catchError(
                () => of(new BoardActions.GetBoardsError())
            )
        )
    
    @Effect()
    CreateBoard$: Observable<Action> = this.action$
        .ofType<BoardActions.CreateBoard>(BoardActions.CREATE_BOARD)
        .pipe(
            switchMap(action => {
                return this.apollo.mutate({
                    mutation: this.createBoardsMutation,
                    variables: {
                        "boardName": action.payload,
                        "user": "Sid"
                    }
                }).pipe(map(res => {
                    return new BoardActions.CreateBoardSuccess(res.data['createBoard']);
                }
            ))
            }),
            catchError(
                () => of(new BoardActions.CreateBoardError())
            )
        )
        
    @Effect()
    DeleteBoard$: Observable<Action> = this.action$
        .ofType<BoardActions.DeleteBoard>(BoardActions.DELETE_BOARD)
        .pipe(
            switchMap(action => {
                console.log('payload-' + action.payload);
                return this.apollo.mutate({
                    mutation: this.deleteBoardMutation,
                    variables: {
                        boardId: action.payload.boardId
                    }
                }).pipe(map(res => {
                    console.log('delere response=' + JSON.stringify(res));
                    return new BoardActions.DeleteBoardSuccess();
                }))
            }),
            catchError(
                () => of(new BoardActions.DeleteBoardFailure())
            )
        )
    
    @Effect({dispatch: false})
    DeleteBoardSuccess$: Observable<Action> = this.action$
        .ofType<BoardActions.DeleteBoardSuccess>(BoardActions.DELETE_BOARD_SUCCESS)
        .pipe(
            tap(() => {
                this.location.back();
            })
        )
}