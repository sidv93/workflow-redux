import { Card } from '../../models/Card';
import { CardState } from './card.state';
import { Action } from '@ngrx/store';

export const GET_CARDS = '[Card] GET_CARDS';
export const GET_CARDS_SUCCESS = '[Card] GET_CARDS_SUCCESS';
export const GET_CARDS_ERROR = '[Card] GET_CARDS_ERROR';
export const CREATE_CARD = '[Card] CREATE_CARD';
export const CREATE_CARD_SUCCESS = '[Card] CREATE_CARD_SUCCESS';
export const CREATE_CARD_ERROR = '[Card] CREATE_CARD_ERROR';

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

export class CreateCard implements Action {
    readonly type = CREATE_CARD;
    constructor(public payload: any) {}
}

export class CreateCardSuccess implements Action {
    readonly type = CREATE_CARD_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateCardError implements Action {
    readonly type = CREATE_CARD_ERROR;
}

export type CardActions = GetCards | GetCardsSuccess | GetCardsError | CreateCard | CreateCardSuccess | CreateCardError;