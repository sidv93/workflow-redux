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
    switch (action.type) {
        case ListActions.GET_LISTS: {
            console.log('in get lists reducer');
            return { ...state };
        }
        case ListActions.GET_LISTS_SUCCESS: {
            console.log('in get lists success reducer');
            console.log('lists-' + JSON.stringify(
                {
                    ...state,
                    lists: [
                        ...action.payload
                    ],
                    loading: false
                }
            ));
            return {
                ...state,
                lists: [
                    ...action.payload
                ],
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}