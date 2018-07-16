import { ListState, ListsState } from './list.state';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as ListActions from './list.action';

@Injectable()
export class ListEffects {
    constructor(private action$: Actions) { }

    @Effect()
    GetLists$: Observable<Action> = this.action$
        .ofType<ListActions.GetLists>(ListActions.GET_LISTS)
        .switchMap(action => {
            console.log('in list effects');
            return action;
        });    
}