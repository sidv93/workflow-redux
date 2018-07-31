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
            return { ...state, loading: true };
        }
        case CardActions.GET_CARDS_SUCCESS: {
            return {
                ...state,
                cards: [
                    ...state.cards,
                    ...action.payload
                ].filter((item, index, self) => self.findIndex(value => value.cardId === item.cardId) === index),
                loading: false
            }
        }
        case CardActions.CREATE_CARD: {
            return state;
        }
        case CardActions.CREATE_CARD_SUCCESS: {
            return {
                ...state,
                cards: [
                    ...state.cards,
                    ...action.payload
                ],
                loading: false
            }
        }
        case CardActions.DELETE_CARD: {
            return state;
        }
        case CardActions.DELETE_CARD_SUCCESS: {
            return {
                ...state,
                cards: [
                    ...state.cards
                ].filter(item => item.cardId !== action.payload),
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}