import { List } from '../../models/List';
import { ListState } from './list.state';
import { Action } from '@ngrx/store';

export const GET_LISTS = '[List] GET_LISTS';
export const GET_LISTS_SUCCESS = '[List] GET_LISTS_SUCCESS';
export const GET_LIStS_ERROR = '[List] GET_LISTS_ERROR';

export class GetLists implements Action {
    readonly type = GET_LISTS;
}

export class GetListsSuccess implements Action {
    readonly type = GET_LISTS_SUCCESS;
    constructor(public payload: ListState[]) {}
}

export class GetListsError implements Action {
    readonly type = GET_LIStS_ERROR;
}

export type ListActions = GetLists | GetListsSuccess | GetListsError;