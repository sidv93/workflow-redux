import { Card } from '../../models/Card';

export interface CardState extends Card {
    loading: boolean;
}

export interface CardListState {
    cards: CardState[];
}