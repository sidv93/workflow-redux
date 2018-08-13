import { Injectable } from "../../../../node_modules/@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Observable, of } from "../../../../node_modules/rxjs";
import * as AuthActions from './auth.actions';
import { switchMap, map, catchError, tap } from "../../../../node_modules/rxjs/operators";
import { AuthState } from "./auth.state";
import { Router } from "../../../../node_modules/@angular/router";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private http: HttpClient, private router: Router, private apollo: Apollo) { }

    @Effect()
    Authenticate$: Observable<Action> = this.action$
        .ofType<AuthActions.Authenticate>(AuthActions.AUTHENTICATE)
        .pipe(
            switchMap(action => {
                return this.apollo.watchQuery({
                    query: gql`
                        query auth($userId: String!, $password: String! ) {
                            auth(userId: $userId, password: $password) {
                                userId
                            }
                        }
                    `,
                    variables: {
                        "userId": action.payload.userId,
                        "password": action.payload.password
                    }
                    }).valueChanges.pipe(map(res => {
                        return new AuthActions.AuthSucess({username: res.data['auth'].userId,password: '',loggedIn: false} as AuthState)
                    }));
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