import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  private turn: number = 1;

  constructor() { }

  public incrementTurn(): void{ this.turn++ }

  public getTurn(): number{ return this.turn }
}
