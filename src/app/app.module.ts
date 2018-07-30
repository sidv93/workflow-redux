import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as BoardReducer from './store/board/board.reducer';
import * as ListReducer from './store/list/list.reducer';
import * as CardReducer from './store/card/card.reducer';
import { BoardEffects } from './store/board/board.effects';
import { CardEffects } from './store/card/card.effects';
import { ListEffects } from './store/list/list.effects';
import { BoardsComponent } from './boards/boards.component';
import { router } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { ListsComponent } from './lists/lists.component';
import { LoginComponent } from './login/login.component';
import { AuthReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { CardFiler } from './cards/cardFilter';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    DashboardComponent,
    CardsComponent,
    ListsComponent,
    LoginComponent,
    CardFiler
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({boards: BoardReducer.BoardReducer, lists: ListReducer.ListReducer, cards: CardReducer.CardReducer, auth: AuthReducer}),
    EffectsModule.forRoot([BoardEffects, CardEffects, ListEffects, AuthEffects]),
    router,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
