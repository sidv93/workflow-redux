import { BoardState, BoardListState } from './board.state';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, debounceTime, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as BoardActions from './board.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoardEffects {
    constructor(private action$: Actions, private http: HttpClient) { }

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
                            console.log('create response=' + JSON.stringify(res));
                            return new BoardActions.CreateBoardSuccess([{ user: 'asteria', boardName: action.payload}] as BoardState[]);
                        })
                    )
            }),
            catchError(
                () => of(new BoardActions.CreateBoardError)
            )
        )
}