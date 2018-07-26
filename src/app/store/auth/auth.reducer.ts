import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export type Action = AuthActions.AuthActions;
const defaultState = {
    username: '',
    password: '',
    loggedIn: false
}

export function AuthReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE: {
            console.log('in authenticate reducer');
            return {
                ...state,
                username: action.payload.userId,
                loggedIn: false
            };
        }
        case AuthActions.AUTH_SUCCESS: {
            console.log('in auth success reducer');
            return {
                ...state,
                loggedIn: true
            }
        }
        default: {
            console.log('in auth defualt reducer');
            return state;
        }
    }
}