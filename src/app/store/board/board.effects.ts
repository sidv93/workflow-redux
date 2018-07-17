import { BoardState, BoardListState } from './board.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, mergeMap, map, debounceTime } from 'rxjs/operators';
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
            debounceTime(2000),
            switchMap(action => {
            return this.http.get('http://localhost:3000/api/v1/boards/Sid')
            .pipe(
                map((res: Response) => {
                    return new BoardActions.GetBoardsSuccess(res['data'] as BoardState[]);
                })
            )
        }));
}