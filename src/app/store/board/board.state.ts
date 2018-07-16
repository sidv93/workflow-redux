import { Board } from '../../models/Board';

export interface BoardState extends Board {
    loading: boolean
}

export interface BoardListState {
    boards: BoardState[];
}