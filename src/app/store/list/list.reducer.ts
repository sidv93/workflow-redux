import { List } from '../../models/List';
import { ListState, ListsState } from './list.state';
import * as ListActions from './list.action';

export type Action = ListActions.ListActions;

const defaultListState: ListState[] = [

];

const defaultState: ListsState = {
    lists: defaultListState
}

export function ListReducer(state = defaultState, action: Action) {
    console.log('state=' + JSON.stringify(state) + ' action=' + action);
    switch(action.type) {
        case ListActions.GET_LISTS : {
            return { ...state };
        }
    }
}