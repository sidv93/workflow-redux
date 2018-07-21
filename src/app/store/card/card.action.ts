import { Card } from '../../models/Card';
import { CardState } from './card.state';
import { Action } from '@ngrx/store';

export const GET_CARDS = '[Card] GET_CARDS';
export const GET_CARDS_SUCCESS = '[Card] GET_CARDS_SUCCESS';
export const GET_CARDS_ERROR = '[Card] GET_CARDS_ERROR';

export class GetCards implements Action {
    readonly type = GET_CARDS;
    constructor(public payload: string) {}
}

export class GetCardsSuccess implements Action {
    readonly type = GET_CARDS_SUCCESS;
    constructor(public payload: CardState[]) {}
}

export class GetCardsError implements Action {
    readonly type = GET_CARDS_ERROR;
}

export type CardActions = GetCards | GetCardsSuccess | GetCardsError;