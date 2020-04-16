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
            return { ...state, userId: action.payload.userId, loading: true }
        }
        case BoardActions.GET_BOARDS_SUCCESS: {
            return {
                ...state,
                boards: [
                    ...action.payload
                ],
                loading: false
            }
        }
        case BoardActions.CREATE_BOARD: {
            return state;
        }

        case BoardActions.CREATE_BOARD_SUCCESS: {
            return {
                ...state,
                boards: [
                    ...state.boards,
                    ...action.payload
                ],
                loading: false
            }
        }

        case BoardActions.DELETE_BOARD: {
            return state;
        }

        case BoardActions.DELETE_BOARD_SUCCESS: {
            return state;
        }

        default: {
            return state;
        }
    }
}