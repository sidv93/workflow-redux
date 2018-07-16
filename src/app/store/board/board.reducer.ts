import { Board } from '../../models/Board';
import { BoardState, BoardListState } from './board.state';
import * as BoardActions from './board.action';

export type Action = BoardActions.BoardActions;

const defaultBoardState: BoardState[] = [
    
]

const defaultState: BoardListState = {
    boards: defaultBoardState
}

export function BoardReducer(state = defaultState, action: Action) {
    console.log('state-' + JSON.stringify(state) + ' action=' + action);
    switch(action.type) {
        case BoardActions.GET_BOARDS : {
            return { ...state}
        }
    }
}