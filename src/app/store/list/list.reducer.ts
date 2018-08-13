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
            console.log('get lists-' + JSON.stringify(action.payload));
            return { ...state, boardId: action.payload.boardId, boardName: action.payload.boardName };
        }
        case ListActions.GET_LISTS_SUCCESS: {
            return {
                ...state,
                lists: [
                    ...action.payload
                ],
                loading: false
            }
        }
        case ListActions.CREATE_LIST : {
            return state;
        }
        case ListActions.CREATE_LIST_SUCCESS : {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    ...action.payload
                ],
                loading: false
            };
        }
        case ListActions.DELETE_LIST: {
            return state;
        }
        case ListActions.DELETE_LIST_SUCCESS: {
            return {
                ...state,
                lists: [...state.lists].filter(item => item.listId !== action.payload),
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}