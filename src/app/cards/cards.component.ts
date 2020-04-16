import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements OnInit {

  @Input() card;
  @Output() deleteCard = new EventEmitter<any>();
  @Output() updateCard = new EventEmitter<any>();
  public cardData;
  public showOptionsFlag: boolean = false;

  constructor() { }

  ngOnInit() {
    this.cardData = this.card.cardData;
  }

  public updateCards() {
    this.updateCard.emit({
      cardData: this.cardData,
      cardId: this.card.cardId
    });
    this.showOptionsFlag = false;
  }
  public deleteCards() {
    this.deleteCard.emit(this.card.cardId);
    this.showOptionsFlag = false;
  }

  public showOptions() {
    this.showOptionsFlag = true;
  }
}
