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
  public cardData;
  public showOptionsFlag: boolean= false;

  constructor() { }

  ngOnInit() {
    this.cardData = this.card.cardData;
  }

  public updateCard() {

  }
  public deleteCards() {
    this.deleteCard.emit(this.card.cardId);
  }

  public showOptions() {
    this.showOptionsFlag = true;
  }
}
