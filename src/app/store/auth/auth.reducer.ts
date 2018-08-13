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
            return {
                ...state,
                username: action.payload.userId,
                loggedIn: false
            };
        }
        case AuthActions.AUTH_SUCCESS: {
            console.log('in Auth success');
            return {
                ...state,
                loggedIn: true
            }
        }
        default: {
            return state;
        }
    }
}