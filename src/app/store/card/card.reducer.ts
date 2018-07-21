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
    switch (action.type) {
        case CardActions.GET_CARDS: {
            console.log('in get cards reducer');
            console.log('get cards payload=' + action.payload);
            return { ...state, loading: true };
        }
        case CardActions.GET_CARDS_SUCCESS: {
            console.log('in get cards success reducer');
            console.log('state-' + JSON.stringify(
                {
                    ...state,
                    cards: [
                        ...action.payload
                    ],
                    loading: false
                }
            ))
            return {
                ...state,
                cards: [
                    ...action.payload
                ],
                loading: false
            }
        }
        default: {
            console.log('in default card reducer');
            return state;
        }
    }
}