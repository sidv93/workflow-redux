import { List } from '../../models/List';
import { ListState } from './list.state';
import { Action } from '@ngrx/store';

export const GET_LISTS = '[List] GET_LISTS';

export class GetLists implements Action {
    readonly type = GET_LISTS;
}

export type ListActions = GetLists;