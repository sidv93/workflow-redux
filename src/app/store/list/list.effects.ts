import { ListState, ListsState } from './list.state';
import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as ListActions from './list.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ListEffects {
    constructor(private action$: Actions, private http: HttpClient) { }

    @Effect()
    GetLists$: Observable<Action> = this.action$
        .ofType<ListActions.GetLists>(ListActions.GET_LISTS)
        .pipe(
            switchMap(action => {
                return this.http.get('http://localhost:3000/api/v1/lists/2').pipe(
                    map((res: Response) => {
                        return new ListActions.GetListsSuccess(res['data'] as ListState[]);
                    })
                )
            }),
            catchError(
                () => of(new ListActions.GetListsError())
            )
        );
}