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

@Injectable()
export class BoardEffects {
    constructor(private action$: Actions, private http: HttpClient, private location: Location, private apollo: Apollo) { }

    @Effect()
    GetBoards$: Observable<Action> = this.action$
        .ofType<BoardActions.GetBoards>(BoardActions.GET_BOARDS)
        .pipe(
            // debounceTime(2000),
            switchMap(action => {
                return this.http.get('http://localhost:3000/api/v1/boards/asteria')
                    .pipe(
                        map((res: Response) => {
                            return new BoardActions.GetBoardsSuccess(res['data'] as BoardState[]);
                        })
                    )
            }),
            catchError(
                () => of(new BoardActions.GetBoardsError())
            ));
    
    @Effect()
    CreateBoard$: Observable<Action> = this.action$
        .ofType<BoardActions.CreateBoard>(BoardActions.CREATE_BOARD)
        .pipe(
            switchMap(action => {
                return this.http.post('http://localhost:3000/api/v1/board',{ user: 'asteria', boardName: action.payload})
                    .pipe(
                        map((res: Response) => {
                            return new BoardActions.CreateBoardSuccess(new Array(res['data']) as BoardState[]);
                        })
                    )
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
                return this.http.delete('http://localhost:3000/api/v1/board/' + action.payload.boardId)
                    .pipe(
                        map((res: Response) => {
                            return new BoardActions.DeleteBoardSuccess();
                        })
                    )
            }),
            catchError(
                () =>of(new BoardActions.DeleteBoardFailure())
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