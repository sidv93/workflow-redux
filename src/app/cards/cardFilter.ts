import { Pipe, PipeTransform } from "../../../node_modules/@angular/core";

@Pipe({name: 'cardFilter'})
export class CardFiler implements PipeTransform {
    transform(cards: any, listId: string) {
        return cards.cards.filter(item => item.listId === listId);
    }
}