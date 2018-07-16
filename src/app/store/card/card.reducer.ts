import { Card } from '../../models/Card';
import { CardState, CardListState } from './card.state';
import * as CardActions from './card.action';

export type Action = CardActions.CardActions;

const defaultCardState: CardState[] = [

];

const defaultState: CardListState = {
    cards: defaultCardState
}

export function CardReducer(state = defaultState, action: Action) {
    console.log('state=' + JSON.stringify(state) + ' action=' + action);
    switch(action.type) {
        case CardActions.GET_CARDS : {
            return { ...state };
        }
    }
}