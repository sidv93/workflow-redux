import { Injectable } from "../../../../node_modules/@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Observable, of } from "../../../../node_modules/rxjs";
import * as AuthActions from './auth.actions';
import { switchMap, map, catchError, tap } from "../../../../node_modules/rxjs/operators";
import { AuthState } from "./auth.state";
import { Router } from "../../../../node_modules/@angular/router";

@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private http: HttpClient, private router: Router) { }

    @Effect()
    Authenticate: Observable<Action> = this.action$
        .ofType<AuthActions.Authenticate>(AuthActions.AUTHENTICATE)
        .pipe(
            switchMap(action => {
                return this.http.post('http://localhost:3000/api/v1/user/login/', action.payload)
                    .pipe(
                        map((res: Response) => {
                            return new AuthActions.AuthSucess(res['data'] as AuthState)
                        })
                    )
            }),
            catchError(
                () => of(new AuthActions.AuthFail())
            )
        )

    @Effect({ dispatch: false })
    AuthSuccess$: Observable<Action> = this.action$
        .ofType<AuthActions.AuthSucess>(AuthActions.AUTH_SUCCESS)
        .pipe(
            tap((user) => {
                this.router.navigate(['dashboard']);
            })
        );
}