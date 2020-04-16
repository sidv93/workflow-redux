import { List } from "../../models/List";

export interface ListState extends List {
    loading: boolean;
}

export interface ListsState {
    lists: ListState[];
}