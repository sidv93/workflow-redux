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
    switch(action.type) {
        case BoardActions.GET_BOARDS : {
            console.log('in get boards reducer');
            return { ...state, loading: true }
        }

        case BoardActions.GET_BOARDS_SUCCESS: {
            console.log('in get boards success reducer');
            return {
                ...state,
                boards: [
                    ...action.payload
                ],
                loading: false
            }
        }
    }
}