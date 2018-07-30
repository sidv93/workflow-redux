import { List } from '../../models/List';
import { ListState } from './list.state';
import { Action } from '@ngrx/store';

export const GET_LISTS = '[List] GET_LISTS';
export const GET_LISTS_SUCCESS = '[List] GET_LISTS_SUCCESS';
export const GET_LIStS_ERROR = '[List] GET_LISTS_ERROR';
export const CREATE_LIST = '[List] CREATE_LIST';
export const CREATE_LIST_SUCCESS = '[List] CREATE_LIST_SUCCESS';
export const CREATE_LIST_ERROR = '[List] CREATE_LIST_ERROR';
export const DELETE_LIST = '[List] DELETE_LIST';
export const DELETE_LIST_SUCCESS = '[List] DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = '[List] DELETE_LIST_FAILURE';

export class GetLists implements Action {
    readonly type = GET_LISTS;
    constructor(public payload: any) {}
}

export class GetListsSuccess implements Action {
    readonly type = GET_LISTS_SUCCESS;
    constructor(public payload: ListState[]) {}
}

export class GetListsError implements Action {
    readonly type = GET_LIStS_ERROR;
}

export class CreateList implements Action {
    readonly type = CREATE_LIST;
    constructor(public payload: any) {}
}

export class CreateListSuccess implements Action {
    readonly type = CREATE_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class CreateListError implements Action {
    readonly type = CREATE_LIST_ERROR;
}

export class DeleteList implements Action {
    readonly type = DELETE_LIST;
    constructor(public payload: any) {}
}

export class DeleteListSuccess implements Action {
    readonly type = DELETE_LIST_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteListFailure implements Action {
    readonly type = DELETE_LIST_FAILURE;
}

export type ListActions = GetLists | GetListsSuccess | GetListsError | 
    CreateList | CreateListSuccess | CreateListError | DeleteList | DeleteListSuccess | DeleteListFailure;