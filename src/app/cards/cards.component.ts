import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() card;
  public cardData;
  public showOptionsFlag: boolean= false;

  constructor() { }

  ngOnInit() {
    console.log('cards recieved=' + JSON.stringify(this.card));
    this.cardData = this.card.cardData;
  }

  public updateCard() {

  }
  public deleteCard() {

  }

  public showOptions() {
    this.showOptionsFlag = true;
  }
}
