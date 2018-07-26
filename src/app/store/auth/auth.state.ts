import { Auth } from '../../models/Auth';

export interface AuthState extends Auth {
    loggedIn: false;
}