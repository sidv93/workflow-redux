import { AuthState } from './auth.state';
import { Action } from '@ngrx/store';

export const AUTHENTICATE = '[Auth] AUTHENTICATE';
export const AUTH_SUCCESS = '[Auth] AUTH_SUCCESS';
export const AUTH_FAIL = '[Auth] AUTH_FAIL';

export class Authenticate implements Action {
    readonly type = AUTHENTICATE;
    constructor(public payload: any) {}
}

export class AuthSucess implements Action {
    readonly type = AUTH_SUCCESS;
    constructor(public payload: any) {}
}

export class AuthFail implements Action {
    readonly type = AUTH_FAIL;
}

export type AuthActions = Authenticate | AuthSucess | AuthFail;