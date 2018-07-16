import { Card } from '../../models/Card';
import { CardState } from './card.state';
import { Action } from '@ngrx/store';

export const GET_CARDS = '[Card] GET_CARDS';

export class GetCards implements Action {
    readonly type = GET_CARDS;
}

export type CardActions = GetCards;