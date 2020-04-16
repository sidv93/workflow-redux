import { List } from './List';

export class Board {
	public boardName: string;
    public boardId: string ;
    public user: string ;
    public date: string ;
    public lists: List[];
	public contructor() {
        this.boardId = '';
        this.boardName = '';
        this.user = '';
        this.date = '';
        this.lists = [];
     }
}