import { Card } from './Card';

export class List {
	public listName: string;
    public boardId: string ;
    public listId: string ;
    public cards: Card[];
	public contructor() {
        this.listId = '';
        this.listName = '';
        this.boardId = '';
        this.cards = [];
    }
}