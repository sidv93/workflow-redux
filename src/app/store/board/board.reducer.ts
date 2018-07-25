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
    switch (action.type) {
        case BoardActions.GET_BOARDS: {
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
        case BoardActions.CREATE_BOARD: {
            console.log('in create board reducer');
            console.log('board payload=' + action.payload);
            console.log('state during creating board=' + JSON.stringify(state));
            return state;
        }

        case BoardActions.CREATE_BOARD_SUCCESS: {
            console.log('in create board success reducer');
            console.log('state before success=' + JSON.stringify(state));
            console.log('payload=' + JSON.stringify(action.payload));
            console.log('state after success=' + JSON.stringify(
                {
                    ...state,
                    boards: [
                        ...state.boards,
                        ...action.payload
                    ],
                    loading: false
                }
            ));
            return {
                ...state,
                boards: [
                    ...state.boards,
                    ...action.payload
                ],
                loading: false
            }
        }

        default: {
            console.log('in default board reducer');
            return state;
        }
    }
}