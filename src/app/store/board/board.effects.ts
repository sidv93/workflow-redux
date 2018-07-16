import { BoardState, BoardListState } from './board.state';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as BoardActions from './board.action';

@Injectable()
export class BoardEffects {
    constructor(private action$: Actions) { }

    @Effect()
    GetBoards$: Observable<Action> = this.action$
        .ofType<BoardActions.GetBoards>(BoardActions.GET_BOARDS)
        .switchMap(action => {
            console.log('in board effects');
            return action;
        });    
}