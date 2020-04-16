import { BoardState } from './board.state';
import { Board } from '../../models/Board';
import { Action } from '@ngrx/store';

export const GET_BOARDS = '[Board] GET_BOARDS';
export const GET_BOARDS_SUCCESS = '[Board] GET_BOARDS_SUCCESS';
export const GET_BOARDS_ERROR = '[Board] GET_BOARDS_ERROR';
export const CREATE_BOARD = '[Board] CREATE_BOARD';
export const CREATE_BOARD_SUCCESS = '[Board] CREATE_BOARD_SUCCESS';
export const CREATE_BOARD_ERROR = '[Board] CREATE_BOARD_ERROR';
export const DELETE_BOARD = '[Board] DELETE_BOARD';
export const DELETE_BOARD_SUCCESS = '[Board] DELETE_BOARD_SUCCESS';
export const DELETE_BOARD_FAILURE = '[Board] DELETE_BOARD_FAILURE';

export class GetBoards implements Action {
    readonly type = GET_BOARDS;
    constructor(public payload: any) {}
}

export class GetBoardsSuccess implements Action {
    readonly type = GET_BOARDS_SUCCESS;

    constructor(public payload: BoardState[]) {}
}

export class GetBoardsError implements Action {
    readonly type = GET_BOARDS_ERROR;
}

export class CreateBoard implements Action {
    readonly type = CREATE_BOARD;
    constructor(public payload: string) {}
}

export class CreateBoardSuccess implements Action {
    readonly type = CREATE_BOARD_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateBoardError implements Action {
    readonly type = CREATE_BOARD_ERROR;
}

export class DeleteBoard implements Action {
    readonly type = DELETE_BOARD;
    constructor(public payload: any) { }
}

export class DeleteBoardSuccess implements Action {
    readonly type = DELETE_BOARD_SUCCESS;
}

export class DeleteBoardFailure implements Action {
    readonly type = DELETE_BOARD_FAILURE;
}

export type BoardActions = GetBoards | GetBoardsSuccess | GetBoardsError | CreateBoard | CreateBoardSuccess
    | CreateBoardError | DeleteBoard | DeleteBoardSuccess | DeleteBoardFailure;