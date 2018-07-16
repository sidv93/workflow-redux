import { BoardState } from './board.state';
import { Board } from '../../models/Board';
import { Action } from '@ngrx/store';

export const GET_BOARDS = '[Board] GET_BOARDS';

export class GetBoards implements Action {
    readonly type = GET_BOARDS;
}

export type BoardActions = GetBoards;