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
            console.log('payload=' + JSON.stringify(action.payload));
            return { ...state, boardId: action.payload.boardId, boardName: action.payload.boardName };
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
        case ListActions.CREATE_LIST : {
            console.log('in create list reducer');
            console.log('list payload=' + JSON.stringify(action.payload));
        }
        case ListActions.CREATE_LIST_SUCCESS : {
            console.log('in create list success reducer');
        }
        default: {
            return state;
        }
    }
}