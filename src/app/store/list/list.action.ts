import { List } from '../../models/List';
import { ListState } from './list.state';
import { Action } from '@ngrx/store';

export const GET_LISTS = '[List] GET_LISTS';
export const GET_LISTS_SUCCESS = '[List] GET_LISTS_SUCCESS';
export const GET_LIStS_ERROR = '[List] GET_LISTS_ERROR';
export const CREATE_LIST = '[List] CREATE_LIST';
export const CREATE_LIST_SUCCESS = '[List] CREATE_LIST_SUCCESS';
export const CREATE_LIST_ERROR = '[List] CREATE_LIST_ERROR';

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

export type ListActions = GetLists | GetListsSuccess | GetListsError | 
    CreateList | CreateListSuccess | CreateListError;